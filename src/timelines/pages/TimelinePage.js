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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import DomainIcon from 'material-ui-icons/Domain';
import MenuIcon from 'material-ui-icons/Menu';
import PeopleIcon from 'material-ui-icons/People';
import PublicIcon from 'material-ui-icons/Public';
import WhatshotIcon from 'material-ui-icons/Whatshot';

import AppBar from '../../common/components/AppBar';
import ComposeButton from '../components/ComposeButton';
import ComposeDialog from '../components/ComposeDialog';
import ErrorMessage from '../../common/components/ErrorMessage';
import GalleryViewer from '../components/GalleryViewer';
import LoadingIndicator from '../../common/components/LoadingIndicator';
import Timeline from '../components/Timeline';

import { mastodonInit, loadNextTimelineBatch } from '../../common/actions/Mastodon';

const styles = theme => ({
    appBarIcon: {
        transition: theme.transitions.create(['color'], {
            easing: theme.transitions.easing.ease,
            duration: theme.transitions.duration.longest,
        }),
        '&:hover': {
            color: theme.palette.primary.A100,
        },
    },

    appToolbarButton: {
        textTransform: 'none',
        borderRadius: 64,
        '&:hover': {
            backgroundColor: 'inherit',
            color: theme.palette.primary.A100,
        },
        transition: theme.transitions.create(['color'], {
            easing: theme.transitions.easing.ease,
            duration: theme.transitions.duration.longest,
        }),
    },

    content: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 56px)',
        top: 56,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            top: 48,
            maxHeight: 'calc(100vh - 48px)',
        },
        [theme.breakpoints.up('sm')]: {
            top: 64,
            maxHeight: 'calc(100vh - 64px)',
        },
    },
});

const TimelineIcon = withRouter(withStyles(styles)((props) => {
    switch (props.match.params.timeline) {
    case 'firehose':
        return (<WhatshotIcon className={props.className}/>);
    default:
        return (<MenuIcon className={props.className} />);
    }
}));

const TimelineAppToolbar = withRouter(withStyles(styles)((props) => {
    switch (props.match.params.timeline) {
    case 'firehose':
        return (
            <Button color="contrast"
                    className={props.classes.appToolbarButton}
                    onClick={() => { document.getElementById("top").scrollIntoView({behavior: "smooth", block: "start"}); }}>
              <Typography type="title" color="inherit" noWrap>
                Firehose
              </Typography>
            </Button>
        );
    default:
        return null;
    }
}));

const TimelineDrawer = withRouter((props) => (
    <div>
      <List>
        <ListItem button disabled={props.match.params.timeline === "firehose"}>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary="Firehose" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Mentions" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DomainIcon />
          </ListItemIcon>
          <ListItemText primary="Local timeline" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Federated timeline" />
        </ListItem>
      </List>
    </div>
));

class TimelinePage extends React.Component {
    componentDidMount() {
        mastodonInit({config: this.props.mastodonConfig,
                      timelineName: this.props.match.params.timeline});

        this.main.focus();
    }

    handleScroll = self => e => {
        const m = e.target;
        const buffer = 40;

        if ((m.scrollHeight - m.scrollTop) <= (m.clientHeight + buffer)) {
            loadNextTimelineBatch({timelineName: this.props.match.params.timeline});
        }
    }

    render() {
        const timelineName = this.props.match.params.timeline;

        return (
            <div>
              <ErrorMessage />
              <GalleryViewer />
              <ComposeDialog />
              <ComposeButton />
              <AppBar icon={<TimelineIcon className={this.props.classes.appBarIcon}/>}
                      toolbar={<TimelineAppToolbar />}
                      drawerItems={<TimelineDrawer />} />

              <LoadingIndicator />

              <main className={this.props.classes.content}
                    tabIndex={0}
                    ref={(main) => {this.main = main;}}
                    id="timeline"
                    onScroll={this.handleScroll(this)}>
                <div id="top" />
                <Timeline name={timelineName}
                          statuses={this.props.statuses}
                          items={this.props.timeline.get(timelineName)} />
              </main>
            </div>
        );
    }
};

const stateToProps = (state, props) => ({
    mastodonConfig: state.getIn(["configuration", "mastodon"]),
    timeline: state.getIn(["timeline", "timelines"]),
    statuses: state.getIn(["timeline", "statuses"]),
});

export default connect(stateToProps)(withStyles(styles)(TimelinePage));
