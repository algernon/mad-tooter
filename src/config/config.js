import initConfig from './settings';
import { MastodonAPI } from '../mastodon/API';

initConfig();

let mastodonConfig = JSON.parse(window.localStorage.getItem("mastodon"));

export const config = {mastodon: mastodonConfig,
                       api: new MastodonAPI(Object.values(mastodonConfig)[0])};
