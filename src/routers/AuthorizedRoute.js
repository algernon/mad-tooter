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

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthorizedRoute extends React.Component {
    render() {
        const { component: Component, pending, configured, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                  if (pending)
                      return null;
                  return configured
                    ? <Component {...props} />
                    : <Redirect to="/auth" />;
              }} />
        )
    }
}

const stateToProps = (state, props) => ({
    configured: !!state.getIn(["configuration", "mastodon"]),
    pending: state.getIn(["configuration", "mastodon"]) === {},
});

export default connect(stateToProps)(AuthorizedRoute);
