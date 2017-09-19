/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';

import TootCard from './toot/Card';
import TootFrame from './frame/Frame';

import { AuthToken } from '../config/authToken';

import axios from 'axios';

const styles = theme => ({
    list: {
        flex: "none",
    },
});

class Timeline extends React.Component {
    state = {
        axios: axios.create({
            baseURL: 'https://trunk.mad-scientist.club/api/v1',
            headers: {"Authorization": "Bearer " + AuthToken},
        }),
        timeline: [],
    };

    componentDidMount () {
        this.state.axios.get("/timelines/home")
            .then((response) => {
                this.setState({timeline: response.data})
            });
    }

    render () {
        if (this.state.timeline.length === 0)
            return (
                <LinearProgress color="accent" mode="query" />
            );

        return (
            <List className={this.props.classes.list} width="100%" dense>
              {this.state.timeline.map(toot => {
                  return (
                      <ListItem key={`toot-${toot.id}`}>
                            <TootCard toot={toot} />
                      </ListItem>
                  );
              })}
            </List>
        );
    }
}
Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};
Timeline = withStyles(styles)(Timeline);

class MadTooter extends React.Component {
    render() {
        return (
            <TootFrame>
              <Timeline />
            </TootFrame>
        );
    }
}
MadTooter.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MadTooter);
