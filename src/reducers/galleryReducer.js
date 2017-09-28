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
    show: false,
    images: null,
    startIndex: 0,
});

const galleryReducer = (state = initialState, action) => {
    if (action.type === 'GALLERY_HIDE') {
        return state.set("show", false);
    }

    if (action.type === 'GALLERY_SHOW') {
        return state.merge({show: true,
                            images: action.images,
                            startIndex: action.startIndex});
    }

    return state;
};

export default galleryReducer;
