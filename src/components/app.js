/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

import TootFrame from './frame/Frame';
import Timeline from './Timeline';

class MadTooter extends React.Component {
    render() {
        return (
            <TootFrame>
              <Timeline />
            </TootFrame>
        );
    }
}
export default MadTooter;
