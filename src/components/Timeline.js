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
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 64px)',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
        marginTop: 64,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 48px)',
            maxHeight: 'calc(100vh - 96px)',
            marginTop: 48,
        },
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
            <main className={this.props.classes.content}>
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
            </main>
        );
    }
}
Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Timeline);
