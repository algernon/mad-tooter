// @flow

import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { createMuiTheme } from 'material-ui/styles';
import { blue, indigo, red, deepPurple, orange, deepOrange, brown, amber } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: deepPurple,
  },
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager: Map<*, *> = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
