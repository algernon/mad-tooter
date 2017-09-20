/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';

import TootCard from './toot/Card';
import { config } from '../config/config';

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
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            updating: false,
        };
    }

    updateTimeline(timeline, status) {
        let newTimeline = timeline.slice();
        newTimeline.unshift(status);
        return newTimeline;
    }

    componentDidMount () {
        let c = this;
        this.setState({updating: true});
        config.api.timelines("home")
            .then((response) => {
                this.setState({timeline: response.data,
                               updating: false});
            });
        config.api.streaming("user").addEventListener('message', function (e) {
            let event = JSON.parse(e.data);
            if (event.event === "update") {
                let payload = JSON.parse(event.payload);
                c.setState((prevState, props) => ({
                    timeline: c.updateTimeline(prevState.timeline, payload)
                }))
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
              </List>
            </div>
        );
    }
}
Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Timeline);
