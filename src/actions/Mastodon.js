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
import { MastodonMultiAPI } from '../mastodon/API';

let api = null;

const addTimelineItems = (name, timeline) => {
    store.dispatch({
        type: 'TIMELINE_ADD',
        name: name,
        timeline: timeline,
    });
};

const prependTimelineItem = (timelineName, item) => {
    store.dispatch({
        type: "TIMELINE_PREPEND",
        name: timelineName,
        item: item,
    });
};

export const mastodonInit = (props) => {
    api = new MastodonMultiAPI(props.config);

    api.timeline("home").latest((timeline) => {
        addTimelineItems(props.timelineName, timeline);
    });
    api.startStreaming("user", {update: (item) => {
        prependTimelineItem(props.timelineName, item);
    }});
};

export const loadNextTimelineBatch = (props) => {
    api.timeline("home").next((timeline) => {
        addTimelineItems(props.timelineName, timeline);
    });
};

export const postToot = (props) => {
    api.post(props.text);
};
