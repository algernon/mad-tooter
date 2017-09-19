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
import ReactInterval from 'react-interval';

const styles = theme => ({
    list: {
        flex: "none",
    },
    progress: {
        position: 'absolute',
        zIndex: 9999,
        top: '64px',
        left: '0px',
        width: '100%',
        opacity: 0.5,
    },
});

class Timeline extends React.Component {
    state = {
        axios: axios.create({
            baseURL: 'https://trunk.mad-scientist.club/api/v1',
            headers: {"Authorization": "Bearer " + AuthToken},
        }),
        timeline: [],
        updating: false,
    };

    updateTimeline = () => {
        this.setState({updating: true})
        this.state.axios.get("/timelines/home")
            .then((response) => {
                this.setState({timeline: response.data,
                               updating: false})
            });
    }

    componentDidMount () {
        this.updateTimeline();
    }

    render () {
        let progressBar = null;
        if (this.state.updating) {
            progressBar = (
                <LinearProgress color="primary" mode="indeterminate" className={this.props.classes.progress} />
            );
        }

        return (
            <div>
              {progressBar}
              <List className={this.props.classes.list} width="100%" dense>
                {this.state.timeline.map(toot => {
                    return (
                        <ListItem key={`toot-${toot.id}`}>
                          <TootCard toot={toot} />
                        </ListItem>
                    );
                })}
                <ReactInterval timeout={10000} enabled={true} callback={this.updateTimeline}/>
              </List>
            </div>
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
