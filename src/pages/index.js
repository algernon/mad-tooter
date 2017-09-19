/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';

import withRoot from '../components/withRoot';
import MadTooter from '../components/app';

const styles = {
    root: {
        height: '100%',
    },
};

class Index extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
              <MadTooter />
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
