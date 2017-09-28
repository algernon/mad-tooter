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

import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';

import store from '../store';

const styles = theme => ({
    snackbar: {
        bottom: theme.spacing.unit,
        right: 'auto',
        left: theme.spacing.unit,
    },
});

class ErrorMessage extends React.Component {
    handleRequestClose = () => {
        store.dispatch({type: 'HIDE_ERROR'});
    }

    render() {
        const { show, message, classes, transient } = this.props;

        return (
            <Snackbar open={show}
                      message={<span>{message}</span>}
                      onRequestClose={this.handleRequestClose}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      autoHideDuration={transient ? 5000 : null}
                      classes={{
                          anchorBottomLeft: classes.snackbar,
                      }} />
        );
    }
}

const stateToProps = (state, props) => ({
    message: state.getIn(["error", "message"]),
    show: state.getIn(["error", "show"]),
    transient: state.getIn(["error", "transient"]),
});

export default connect(stateToProps)(withStyles(styles)(ErrorMessage));
