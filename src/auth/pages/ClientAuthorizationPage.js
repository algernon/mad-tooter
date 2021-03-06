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
import { Redirect } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { authorizeClient } from '../../common/actions/client';
import AddAccount from '../components/AddAccount';
import ErrorMessage from '../../common/components/ErrorMessage';

class ClientAuthorizationPage extends React.Component {
    render() {
        const { configured, pending } = this.props;

        if (pending)
            return null;

        if (configured)
            return (<Redirect to="/" />);

        return (
            <div>
              <AppBar color="primary" position="static">
                <Toolbar>
                  <div>
                    <Typography type="title" color="inherit" noWrap>
                      Mad Tooter Setup Wizard
                    </Typography>
                  </div>
                </Toolbar>
              </AppBar>
              <AddAccount onSubmit={authorizeClient} />
              <ErrorMessage />
            </div>
        );
    }
};

const stateToProps = (state, props) => ({
    configured: !!state.getIn(["configuration", "mastodon"]),
    pending: state.getIn(["configuration", "mastodon"]) === {},
});

export default connect(stateToProps)(ClientAuthorizationPage);
