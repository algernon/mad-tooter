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
    }

    timelines(timeline, max_id) {
        return this.state.http.get("/api/v1/timelines/" + timeline,
                                   {params: {max_id: max_id}});
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

    streaming(stream) {
        return this.state.streaming[stream];
    }

    startStreaming(stream, handlers) {
        return this.streaming(stream).addEventListener('message', (e) => {
            let event = JSON.parse(e.data);
            if (event.event === "update") {
                let payload = JSON.parse(event.payload);
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
