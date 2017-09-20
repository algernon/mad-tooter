/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';

import withRoot from '../components/withRoot';
import MadTooter from '../components/app';
import RegisterWizard from '../components/app/RegisterWizard'
import { config } from '../config/config';

const styles = {
    root: {
        height: '100%',
    },
};

class Index extends Component {
    state = {
        configured: !!window.localStorage.mastodon,
    };

    componentWillMount () {
        if (this.state.configured) {
            config.run();
        }
    }

    render() {
        if (this.state.configured) {
            return (
                <div className={this.props.classes.root}>
                  <MadTooter />
                </div>
            );
        } else {
            return (
                <div className={this.props.classes.root}>
                  <RegisterWizard onSuccess={() => {
                        config.run();
                        this.setState({configured: true});
                    }} />
                </div>
            );
        }
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
