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

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    mastodon: {},
});

const configurationReducer = (state = initialState, action) => {
    if (action.type === 'LOAD_CONFIGURATION') {
        const mastodonConfig = JSON.parse(window.localStorage.getItem("mastodon"));
        return state.set("mastodon", Immutable.fromJS(mastodonConfig));
    }

    if (action.type === 'STORE_CONFIGURATION') {
        window.localStorage.setItem("mastodon", JSON.stringify(action.payload.config));
        return state.set("mastodon", Immutable.fromJS(action.payload.config));
    }

    return state;
};

export default configurationReducer;
