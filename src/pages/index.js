/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import MiniDrawer from '../components/frame';
import { blue } from 'material-ui/colors';

const primary = blue[500];

const styles = {
    root: {
        height: '100%',
    },
};

class Index extends Component {
    state = {
        open: false,
    };

    render() {
        return (
                <div className={this.props.classes.root}>
                  <MiniDrawer/>
                </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
