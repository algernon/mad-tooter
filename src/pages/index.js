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
