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
    firehose: [],
});

const timelineReducer = (state = initialState, action) => {
    if (action.type === 'TIMELINE_ADD') {
        return state.update(action.name, list => list.concat(action.timeline));
    }

    if (action.type === 'TIMELINE_PREPEND') {
        return state.update(action.name, list => list.insert(0, action.item));
    }

    if (action.type === 'TIMELINE_START') {
        action.api.timeline("home").latest((timeline) => {
            action.dispatch({
                type: 'TIMELINE_ADD',
                name: action.timelineName,
                timeline: timeline,
            });
            action.dispatch({
                type: 'TIMELINE_SUBSCRIBE',
                timelineName: action.timelineName,
                api: action.api,
                stream: "user",
                dispatch: action.dispatch,
            });
            action.dispatch({
                type: "LOADING_INDICATOR_HIDE",
            });
        });
        return state;
    }

    if (action.type === 'TIMELINE_SUBSCRIBE') {
        action.api.startStreaming("user", (item) => {
            action.dispatch({
                type: "TIMELINE_PREPEND",
                name: action.timelineName,
                item: item,
            });
        });
        return state;
    }

    return state;
};

export default timelineReducer;
