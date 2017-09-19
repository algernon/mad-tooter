/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../styles/createContext';

// Apply some reset
const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
            margin: 0,
            height: '100%',
            overflowY: 'hidden',
        },
        '#root': {
            height: '100%',
        },

        '.disabled': {
            color: '#888',
        },
        '.default-account': {
            backgroundColor: `${theme.palette.primary['A100']} !important`,
        },
        '::-webkit-scrollbar': {
            width: theme.spacing.unit,
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: "transparent",
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.disabled,
        },
        '.mention': {
            color: theme.palette.primary[500],
            textDecoration: 'none',
            borderBottom: `1px dotted ${theme.palette.primary[500]}`,
        },
    },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    componentDidMount() {
      // Remove the server-side injected CSS.
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
