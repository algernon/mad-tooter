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

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import CreateIcon from 'material-ui-icons/Create';

import { composeNewToot } from '../actions/toot';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 1350,
    },
});

class ComposeButton extends React.Component {
    render () {
        const classes = this.props.classes;

        return (
            <div>
              <Button fab color="accent" aria-label="compose"
                      className={classes.button}
                      onClick={composeNewToot} >
                <CreateIcon />
              </Button>
            </div>
        );
    }
}

export default withStyles(styles)(ComposeButton);
