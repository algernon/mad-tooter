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
import { withStyles } from 'material-ui/styles';

import TootCard from './TootCard';
import TootCardEmpty from './TootCardEmpty';

const styles = theme => ({
});

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
              {this.props.items.map(toot => {
                  return (
                      <ListItem key={`toot-${toot.id}-${toot.__mad_tooter && toot.__mad_tooter.source}`}
                                id={`toot-${toot.id}-${toot.__mad_tooter && toot.__mad_tooter.source}`}>
                        <TootCard toot={toot} />
                      </ListItem>
                  );
              })}
            </List>
        );
    }
}

export default withStyles(styles)(Timeline);
