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

const initialState = {
};

const timelineReducer = (state = initialState, action) => {
    if (action.type === 'TIMELINE_ADD') {
        let newState = {};
        newState[action.name] = (state[action.name] || []).concat(action.timeline);
        return Object.assign({}, state, newState);
    }

    if (action.type === 'TIMELINE_PREPEND') {
        let newState = {};
        let newTimeline = state[action.name].slice();
        newTimeline.unshift(action.item);
        newState[action.name] = newTimeline;
        return Object.assign({}, state, newState);
    }

    return state;
};

export default timelineReducer;
