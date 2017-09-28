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
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import AuthorizedRoute from './routers/AuthorizedRoute';
import store from './store';
import { loadConfiguration } from './common/actions/client';
import withRoot from './styles/withRoot';

import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import PrimaryLayout from './layouts/PrimaryLayout';

class App extends React.Component {
    constructor(props) {
        super(props);
        loadConfiguration();
    }

    render() {
        return (
            <Provider store={store}>
              <HashRouter>
                <Switch>
                  <Route path="/auth" component={UnauthorizedLayout} />
                  <AuthorizedRoute path="/" component={PrimaryLayout} />
                  <Redirect to="/auth" />
                </Switch>
              </HashRouter>
            </Provider>
        );
    }
}
App = withRoot(App);

render(<App />, document.querySelector('#root'));
