// @flow weak

import axios from 'axios';

export class MastodonAPI {
    constructor(key, props) {
        this.key = key;
        this.state = {
            http: axios.create({baseURL: props.api.baseURL,
                                headers: {"Authorization": "Bearer " + props.auth.token}}),
            streaming: {
                user: new WebSocket(props.api.wsBaseURL + "/streaming/?stream=user&access_token="
                                    + props.auth.token),
            },
        }
        return this;
    }

    timelines(timeline) {
        return this.state.http.get("/timelines/" + timeline);
    }

    streaming(stream) {
        return this.state.streaming[stream];
    }

    post(text) {
        return this.state.http.post("/statuses", {
            status: text,
        });
    }
};
