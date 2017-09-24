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

import AppBar from '../components/AppBar';
import ComposeButton from '../components/timelines/ComposeButton';
import ComposeDialog from '../components/timelines/ComposeDialog';
import ErrorMessage from '../components/ErrorMessage';
import GalleryViewer from '../components/timelines/GalleryViewer';
import LoadingIndicator from '../components/LoadingIndicator';
import Timeline from '../components/timelines/Timeline';

import { appBarInit } from '../actions/AppBar';
import { mastodonInit, loadNextTimelineBatch } from '../actions/Mastodon';

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
        top: 64,
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px)',
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
        appBarInit({
            icon: (<TimelineIcon className={this.props.classes.appBarIcon} />),
            toolbar: (<TimelineAppToolbar />),
            drawerItems: (<TimelineDrawer />),
        });

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
              <AppBar />
              <LoadingIndicator />

              <main className={this.props.classes.content}
                    tabIndex={0}
                    ref={(main) => {this.main = main;}}
                    id="timeline"
                    onScroll={this.handleScroll(this)}>
                <div id="top" />
                <Timeline name={timelineName}
                          items={this.props.timeline[timelineName]} />
              </main>
            </div>
        );
    }
};

const stateToProps = ({ configuration, timeline }) => ({
    mastodonConfig: configuration.mastodon,
    timeline: timeline,
});

export default connect(stateToProps)(withStyles(styles)(TimelinePage));
