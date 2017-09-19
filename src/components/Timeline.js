/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';

import TootCard from './toot/Card';

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
        streaming: new WebSocket('wss://trunk.mad-scientist.club/api/v1/streaming/?stream=user&access_token=' + AuthToken),
    };

    updateTimeline = () => {
        this.setState({updating: true})
        this.state.axios.get("/timelines/home")
            .then((response) => {
                this.setState({timeline: response.data,
                               updating: false});
            });
    }

    componentDidMount () {
        let c = this;
        this.updateTimeline();
        this.state.streaming.addEventListener('message', function (e) {
            let event = JSON.parse(e.data);
            if (event.event === "update") {
                let newTL = c.state.timeline.slice();
                let payload = JSON.parse(event.payload);
                console.log(payload);
                newTL.unshift(payload);
                c.setState({timeline: newTL});
            }
        });
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
                <ReactInterval timeout={10000} enabled={false} callback={this.updateTimeline}/>
              </List>
            </div>
        );
    }
}
Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Timeline);
