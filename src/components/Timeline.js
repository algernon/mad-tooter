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
import { AppState } from '../app/State';

import parseLink from 'parse-link-header';

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
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
        marginTop: 64,
        position: 'relative',
    },
});

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            timelineNextId: null,
            updating: false,
        };
    }

    fetchTimeline() {
        this.setState({updating: true});
        if (this.state.timelineNextId === "last") {
            this.setState({updating: false});
            return;
        }
        AppState.api.timelines("home", this.state.timelineNextId)
            .then((response) => {
                let nextId = null;
                if (response.headers.link)
                    nextId = parseLink(response.headers.link).next.max_id;
                else
                    nextId = "last";
                this.setState((prevState, props) => ({
                    timeline: prevState.timeline.concat(response.data),
                    timelineNextId: nextId,
                    updating: false,
                }));
            })
    }

    componentDidMount () {
        let self = this;
        this.fetchTimeline();
        AppState.api.startStreaming("user", {update: (payload) => {
            self.setState((prevState, props) => {
                let t = prevState.timeline;
                t.unshift(payload);
                return {timeline: t};
            });
        }});
    }

    handleScroll = self => e => {
        const m = e.target;
        const buffer = 40;

        if (this.state.updating)
            return;

        if ((m.scrollHeight - m.scrollTop) <= (m.clientHeight + buffer)) {
            self.fetchTimeline();
        }
    }

    render () {
        let progressBar = null;
        if (this.state.updating) {
            progressBar = (
                <LinearProgress color="accent" mode="indeterminate" className={this.props.classes.progress} />
            );
        }

        return (
            <main className={this.props.classes.content}
                  onScroll={this.handleScroll(this)}>
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
