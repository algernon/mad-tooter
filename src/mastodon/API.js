// @flow
/* The Mad Tooter -- A Mastodon client
 * Copyright (C) 2017  Gergely Nagy
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios';
import parseLink from 'parse-link-header';

class TimelineAPI {
    constructor(main, timeline) {
        this.state = {updating: false};
        this.main = main;
        this.timeline = timeline;
    }

    __request(params) {
        this.state.updating = true;
        return this.main.state.http.get("/api/v1/timelines/" + this.timeline,
                                        {params: params});
    }

    __annotate(data) {
        return data.map(item => {
            item.__mad_tooter = {source: this.main.key};
            return item;
        });
    }

    next(processor) {
        if (this.state.nextId === "last" || this.state.updating)
            return;

        let self = this;
        this.__request({max_id: this.state.nextId})
            .then((response) => {
                let nextId = null;
                if (response.headers.link)
                    nextId = parseLink(response.headers.link).next.max_id;
                else
                    nextId = "last";

                self.state.nextId = nextId;

                processor(self.__annotate(response.data));
                self.state.updating = false;
            });
    }

    latest(processor) {
        let self = this;

        if (this.state.updating)
            return;

        this.__request(null)
            .then((response) => {
                let nextId = null;
                if (response.headers.link)
                    nextId = parseLink(response.headers.link).next.max_id;
                else
                    nextId = "last";

                self.state.nextId = nextId;

                processor(self.__annotate(response.data));
                self.state.updating = false;
            });
    }
};

export class MastodonAPI {
    constructor(key, props) {
        this.key = key;

        if (props.auth && props.auth.token) {
            this.state = {
                http: axios.create({baseURL: props.api.baseURL,
                                    headers: {"Authorization": "Bearer " + props.auth.token}}),
                streaming: {
                    user: new WebSocket(props.api.wsBaseURL + "/api/v1/streaming/?stream=user&access_token="
                                        + props.auth.token),
                },
            }
        } else {
            this.state = {
                http: axios.create({baseURL: props.api.baseURL}),
            }
        }
        this.timelines = {};
    }


    timeline(timeline) {
        if (!this.timelines[timeline]) {
            this.timelines[timeline] = new TimelineAPI(this, timeline);
        }
        return this.timelines[timeline];
    }

    favourite(id) {
        return this.state.http.post("/api/v1/statuses/" + id + "/favourite");
    }
    unfavourite(id) {
        return this.state.http.post("/api/v1/statuses/" + id + "/unfavourite");
    }

    reblog(id) {
        return this.state.http.post("/api/v1/statuses/" + id + "/reblog");
    }
    unreblog(id) {
        return this.state.http.post("/api/v1/statuses/" + id + "/unreblog");
    }

    startStreaming(stream, handlers) {
        let self = this;
        return this.state.streaming[stream].addEventListener('message', (e) => {
            let event = JSON.parse(e.data);
            if (event.event === "update") {
                let payload = JSON.parse(event.payload);
                payload.__mad_tooter = {
                    source: self.key,
                };
                handlers.update(payload);
            }
        });
    }

    post(data) {
        return this.state.http.post("/api/v1/statuses", data);
    }

    register() {
        return this.state.http.post("/api/v1/apps", {
            client_name: "The Mad Tooter",
            scopes: "read write follow",
            website: "https://algernon.github.io/mad-tooter/",
            redirect_uris: "http://localhost:3000/",
        })
    }

    getAuthToken(client_id, client_secret, username, password) {
        return this.state.http.post("/oauth/token", {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: "password",
            scope: "read write follow",
            username: username,
            password: password
        })
    }
};

export class MastodonMultiAPI {
    constructor(props) {
        this.connections = Object.keys(props).map(key => {
            return new MastodonAPI(key, props[key]);
        });
        this.key = this.connections[0].key;
    }

    startStreaming(stream, handlers) {
        let self = this;
        return Object.keys(this.connections).map(key => {
            return self.connections[key].startStreaming(stream, handlers);
        });
    }

    timeline(timeline) {
        return this.connections[0].timeline(timeline);
    }

    register() {
        return this.connections[0].register();
    }

    getAuthToken(client_id, client_secret, username, password) {
        return this.connections[0].getAuthToken(client_id, client_secret, username, password);
    }

    favourite(id) {
        return this.connections[0].favourite(id);
    }
    unfavourite(id) {
        return this.connections[0].unfavourite(id);
    }

    reblog(id) {
        return this.connections[0].reblog(id);
    }
    unreblog(id) {
        return this.connections[0].unreblog(id);
    }

    post(data) {
        return this.connections[0].post(data);
    }
};
