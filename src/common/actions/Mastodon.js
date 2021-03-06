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

import store from '../../store';
import { MastodonMultiAPI } from '../../mastodon/API';

let api = null;

export const mastodonInit = (props) => {
    api = new MastodonMultiAPI(props.config.toJS());

    store.dispatch({
        type: "LOADING_INDICATOR_SHOW",
    });

    store.dispatch({
        type: "TIMELINE_START",
        payload: {
            api: api,
            dispatch: store.dispatch,
            timelineName: props.timelineName,
        },
    });
};

export const loadNextTimelineBatch = (props) => {
    store.dispatch({
        type: "LOADING_INDICATOR_SHOW",
    });

    api.timeline("home").next((timeline) => {
        store.dispatch({
            type: 'TIMELINE_ADD',
            payload: {
                name: props.timelineName,
                timeline: timeline,
            },
        });
        store.dispatch({
            type: "LOADING_INDICATOR_HIDE",
        });
    });
};

export const postToot = (props) => {
    api.post(props);
};
