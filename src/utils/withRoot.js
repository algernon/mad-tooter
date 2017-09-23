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
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../styles/createContext';

const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
        'img.emoji': {
            height: '1em',
            width: '1em',
            margin: '0 .05em 0 .1em',
            verticalAlign: '-0.1em',
        },
        body: {
            margin: 0,
            height: '100%',
            overflowY: 'hidden',
        },
        '#root': {
            height: '100%',
        },
        '::-webkit-scrollbar': {
            width: theme.spacing.unit,
            [theme.breakpoints.up('md')]: {
                width: theme.spacing.unit * 2,
            },
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: "transparent",
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.disabled,
        },
    },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot(BaseComponent) {
    class WithRoot extends Component {
        componentDidMount() {
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return (
                <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
                  <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
                    <AppWrapper>
                      <BaseComponent />
                    </AppWrapper>
                  </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
    }

    return WithRoot;
}

export default withRoot;
