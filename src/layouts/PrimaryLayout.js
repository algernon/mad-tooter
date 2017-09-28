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
import { Switch, Route, Redirect } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import TimelinePage from '../timelines/pages/TimelinePage';

const styles = theme => ({
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
});

const PrimaryLayout = (props) => (
    <div className={props.classes.appFrame}>
      <Switch>
        <Route path="/timelines/:timeline" component={TimelinePage} />
        <Redirect to="/timelines/firehose" />
      </Switch>
    </div>
);

export default withStyles(styles)(PrimaryLayout);
