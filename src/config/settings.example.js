function initConfig() {
    window.localStorage
        .setItem("mastodon",
                 JSON.stringify(
                     {"<name>": {api: {baseURL: "https://mastodon.social",
                                       wsBaseURL: "wss://mastodon.social"},
                                 auth: {token: "<put your access token here>"}}}));
}

export default initConfig;
