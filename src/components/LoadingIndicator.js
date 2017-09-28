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
import { connect } from 'react-redux';

import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    indicator: {
        position: 'absolute',
        zIndex: 2000,
        width: '100%',
        top: 56,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            top: 48,
        },
        [theme.breakpoints.up('sm')]: {
            top: 64,
        },
    }
});

class LoadingIndicator extends React.Component {
    render () {
        if (!this.props.show)
            return null;

        return (
            <LinearProgress type="query" color="accent"
                            className={this.props.classes.indicator} />
        );
    }
}

const stateToProps = (state, props) => ({
    show: state.getIn(["loadingIndicator", "show"]),
});

export default connect(stateToProps)(withStyles(styles)(LoadingIndicator));
