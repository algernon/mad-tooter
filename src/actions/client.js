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

import store from '../store';
import { MastodonAPI } from '../mastodon/API';
import { showError } from '../utils';

export const loadConfiguration = () => {
    store.dispatch({
        type: 'LOAD_CONFIGURATION',
    });
};

export const authorizeClient = (config) => {
    if (config.accessToken === "") {
        let api = new MastodonAPI(config.key, {api: {baseURL: 'https://' + config.baseURI}});
        api.register()
            .then((response) => {
                api.getAuthToken(response.data.client_id,
                                 response.data.client_secret,
                                 config.username,
                                 config.password)
                    .then((response) => {
                        let newConfig = {};
                        newConfig[config.key] = {
                            api: {baseURL: 'https://' + config.baseURI,
                                  wsBaseURL: 'wss://' + config.baseURI},
                            auth: {token: response.data.access_token}
                        }
                        store.dispatch({
                            type: 'STORE_CONFIGURATION',
                            config: newConfig,
                        });
                    })
                    .catch((error) => {
                        showError("Error obtaining the authorization token. Please verify that the e-mail and the password are correct.");
                    });
            })
            .catch((error) => {
                showError("Error registering the application with the instance. Please verify that the instance is correctly specified.");
            });
    } else {
        let newConfig = {};
        newConfig[config.key] = {
            api: {baseURL: 'https://' + config.baseURI,
                  wsBaseURL: 'wss://' + config.baseURI},
            auth: {token: config.accessToken}
        }
        store.dispatch({
            type: 'STORE_CONFIGURATION',
            config: newConfig,
        });
    }
};
