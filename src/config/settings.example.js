function initConfig() {
    window.localStorage
        .setItem("mastodon",
                 JSON.stringify(
                     {"<name>": {api: {baseURL: "https://mastodon.social/api/v1",
                                       wsBaseURL: "wss://mastodon.social/api/v1"},
                                 auth: {token: "<put your access token here>"}}}));
}

export default initConfig;
