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
    statuses: {},
    timelines: {
        firehose: [],
    },
});

const timelineReducer = (state = initialState, action) => {
    if (action.type === 'TIMELINE_ADD') {
        let statuses = {};
        action.payload.timeline.forEach(item => statuses[item.id] = item);

        let newState = state.mergeIn(["statuses"], statuses);

        return newState
            .updateIn(["timelines", action.payload.name],
                      list => {
                          return list
                              .concat(action.payload.timeline.map(item => item.id.toString()))
                              .sort((a, b) => newState.getIn(["statuses", a]).created_at < newState.getIn(["statuses", b]).created_at)
                      });
    }

    if (action.type === 'TIMELINE_PREPEND') {
        return state
            .setIn(["statuses", action.payload.item.id], Immutable.fromJS(action.payload.item))
            .updateIn(["timelines", action.payload.name],
                      list => list.insert(0, action.payload.item.id));
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
