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

import React from 'react';

import List, { ListItem } from 'material-ui/List';

import { showError } from '../../utils';
import TootCard from './TootCard';
import TootCardEmpty from './TootCardEmpty';

class TimelineItem extends React.Component {
    componentWillMount() {
        if (this.props.item.__type !== "toot") {
            showError("Unsupported event type: " + this.props.item.__type);

            console.log(this.props.item);
        }
    }

    render() {
        const { item } = this.props;

        switch (item.__type) {
        case "toot":
            return (<TootCard toot={item} />);
        default:
            break;
        }

        return null;
    }
}

class Timeline extends React.Component {
    render () {
        if (!this.props.items)
            return (
                <List dense width="100%">
                  {[1, 2, 3, 4].map(index => {
                      return (
                          <ListItem key={`toot-placeholder-${index}`}>
                            <TootCardEmpty />
                          </ListItem>
                      );
                  })}
                </List>
            );

        return (
            <List dense width="100%">
              {this.props.items.map(item => {
                  return (
                      <ListItem key={`item-${item.id}-${item.__mad_tooter && item.__mad_tooter.source}`}
                                id={`item-${item.id}-${item.__mad_tooter && item.__mad_tooter.source}`}>
                        <TimelineItem item={item} />
                      </ListItem>
                  );
              })}
            </List>
        );
    }
}

export default Timeline;
