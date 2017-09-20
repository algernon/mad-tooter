// @flow weak

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

    timelines(timeline) {
        return this.state.http.get("/api/v1/timelines/" + timeline);
    }

    streaming(stream) {
        return this.state.streaming[stream];
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
            username: username,
            password: password
        })
    }
};
