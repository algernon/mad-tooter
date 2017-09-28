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
        return state.update(action.payload.name, list => list.concat(action.payload.timeline));
    }

    if (action.type === 'TIMELINE_PREPEND') {
        console.log(action, action.payload);
        return state.update(action.payload.name, list => list.insert(0, action.payload.item));
    }

    if (action.type === 'TIMELINE_START') {
        action.payload.api.timeline("home").latest((timeline) => {
            action.payload.dispatch({
                type: 'TIMELINE_ADD',
                payload: {
                    name: action.payload.timelineName,
                    timeline: timeline,
                },
            });
            action.payload.dispatch({
                type: 'TIMELINE_SUBSCRIBE',
                payload: {
                    timelineName: action.payload.timelineName,
                    api: action.payload.api,
                    stream: "user",
                    dispatch: action.payload.dispatch,
                },
            });
            action.payload.dispatch({
                type: "LOADING_INDICATOR_HIDE",
            });
        });
        return state;
    }

    if (action.type === 'TIMELINE_SUBSCRIBE') {
        action.payload.api.startStreaming("user", (item) => {
            action.payload.dispatch({
                type: "TIMELINE_PREPEND",
                payload: {
                    name: action.payload.timelineName,
                    item: item,
                },
            });
        });
        return state;
    }

    return state;
};

export default timelineReducer;
