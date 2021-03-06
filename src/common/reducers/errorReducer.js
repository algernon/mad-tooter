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
    message: "",
    show: false,
    transient: false,
});

const errorReducer = (state = initialState, action) => {
    if (action.type === 'SHOW_ERROR') {
        return state.merge({message: action.payload.message,
                            transient: action.payload.transient,
                            show: true});
    }

    if (action.type === 'HIDE_ERROR') {
        return state.set("show", false);
    }

    return state;
};

export default errorReducer;
