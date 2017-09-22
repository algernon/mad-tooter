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
        this.state.timelineMaxIds = {};
    }

    timelines(timeline, processor) {
        const maxIds = this.state.timelineMaxIds;
        if (maxIds && maxIds[timeline] === "last")
            return;

        let self = this;
        this.state.http.get("/api/v1/timelines/" + timeline,
                            {params: {max_id: this.state.timelineMaxIds[timeline]}})
            .then((response) => {
                let nextId = null;
                if (response.headers.link)
                    nextId = parseLink(response.headers.link).next.max_id;
                else
                    nextId = "last";

                let timelineFragment = response.data.map(item => {
                    item.__mad_tooter = {source: this.key};
                    return item;
                });

                self.state.timelineMaxIds[timeline] = nextId;
                processor(timelineFragment);
            });
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

    post(text) {
        return this.state.http.post("/api/v1/statuses", {
            status: text,
        });
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
        this.state = Object.keys(props).map(key => {
            return new MastodonAPI(key, props[key]);
        });
        this.key = this.state[0].key;
    }

    startStreaming(stream, handlers) {
        let self = this;
        return Object.keys(this.state).map(key => {
            return self.state[key].startStreaming(stream, handlers);
        });
    }

    timelines(timeline, processor) {
        return this.state[0].timelines(timeline, processor);
    }

    register() {
        return this.state[0].register();
    }

    getAuthToken(client_id, client_secret, username, password) {
        return this.state[0].getAuthToken(client_id, client_secret, username, password);
    }

    favourite(id) {
        return this.state[0].favourite(id);
    }
    unfavourite(id) {
        return this.state[0].unfavourite(id);
    }

    reblog(id) {
        return this.state[0].reblog(id);
    }
    unreblog(id) {
        return this.state[0].unreblog(id);
    }

    post(text) {
        return this.state[0].post(text);
    }
};
