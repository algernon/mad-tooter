/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

import TootFrame from './frame/Frame';
import Timeline from './Timeline';
import { config } from '../config/config';

class MadTooter extends React.Component {
    render() {
        return (
            <TootFrame config={config}>
              <Timeline config={config}/>
            </TootFrame>
        );
    }
}
export default MadTooter;
