// @flow

import { MastodonAPI } from '../mastodon/API';

class Config {
    state = {
        mastodon: JSON.parse(window.localStorage.getItem("mastodon")),
    }

    run () {
        this.api = new MastodonAPI(Object.keys(this.state.mastodon)[0],
                                   Object.values(this.state.mastodon)[0]);
    }
};

export let config = new Config();
