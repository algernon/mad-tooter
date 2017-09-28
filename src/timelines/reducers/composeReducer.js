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
    title: "Toot",
    replyTo: null,
    text: "",
});

const composeReducer = (state = initialState, action) => {
    if (action.type === 'COMPOSE_HIDE') {
        return state.set("show", false);
    }

    if (action.type === 'COMPOSE_CANCEL') {
        return state.merge({show: false,
                            text: ""});
    }

    if (action.type === 'COMPOSE_SHOW') {
        let newText = state.get("text");
        if (state.get("replyTo") && !action.replyTo)
            newText = "";

        if (action.replyTo) {
            let mentions = [{acct: action.replyTo.account.acct}];
            mentions = mentions.concat(action.replyTo.mentions)

            newText = mentions.map(item => "@" + item.acct).join(" ") + " ";
        }

        return state.merge({show: true,
                            title: action.title || "Toot",
                            replyTo: action.replyTo && action.replyTo.id,
                            text: newText});
    }

    if (action.type === 'COMPOSE_SET_TEXT') {
        return state.set("text", action.text);
    }

    return state;
};

export default composeReducer;
