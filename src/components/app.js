/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import TootAPICard from './toot/APICard';
import TootFrame from './frame/Frame';

const styles = theme => ({
    list: {
        flex: "none",
    },
});

class MadTooter extends React.Component {
    render() {
        return (
            <TootFrame>
              <List className={this.props.classes.list} width="100%" dense>
                <ListItem>
                  <TootAPICard url="https://trunk.mad-scientist.club/api/v1/statuses/3849086" />
                </ListItem>
                <ListItem>
                  <TootAPICard url="https://trunk.mad-scientist.club/api/v1/statuses/3842390" />
                </ListItem>
                <ListItem>
                  <TootAPICard url="https://trunk.mad-scientist.club/api/v1/statuses/3831242" />
                </ListItem>
              </List>
            </TootFrame>
        );
    }
}
MadTooter.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MadTooter);
