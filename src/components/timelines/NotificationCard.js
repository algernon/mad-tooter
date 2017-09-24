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
import twemoji from 'twemoji';

import Collapse from 'material-ui/transitions/Collapse';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import TootCard from './TootCard';
import TootHeader from './card/TootHeader';
import { showError } from '../../utils';

const styles = theme => ({
    notification: {
        width: "100%",
    },
    flex: {
        flex: '1 1 auto',
    },
    meta: {
        display: 'flex',
        paddingRight: theme.spacing.unit * 2,
    },
    content: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        cursor: 'pointer',
    },
    targetToot: {
        marginTop: theme.spacing.unit,
    },
    expander: {
        color: theme.palette.text.disabled,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
        cursor: 'pointer',
    },
});

class NotificationCard extends React.Component {
    constructor(props) {
        super(props);

        let notificationAction = null;
        switch (props.notification.type) {
        case "favourite":
            notificationAction = "favourited";
            break;
        case "reblog":
            notificationAction = "boosted";
            break;
        case "mention":
            notificationAction = "mentioned " + props.notification.__mad_tooter.source;
            break;
        default:
            console.log("Notification: unsupported type",
                        props.notification);
            break;
        }

        this.state = {
            expanded: false,
            notificationAction: notificationAction,
        };
    }

    toggleExpand = self => (e) => {
        e.preventDefault();

        self.setState({expanded: !self.state.expanded});
    }

    showNotificationStatus = (notification) => (e) => {
        e.preventDefault ();
        const id = "item-" + notification.status.id + "-" + notification.__mad_tooter.source;

        const target = document.getElementById(id);
        if (!target) {
            showError("Past notification injection is not implemented yet.");
            return;
        }

        target.scrollIntoView({behavior: "smooth", block: "start"});
    }

    render () {
        const { classes, notification } = this.props;

        if (!notification || !this.state.notificationAction)
            return null;

        if (notification.type === "mention") {
            notification.status.__mad_tooter = notification.__mad_tooter;

            return (
                <TootCard toot={notification.status}
                          action={this.state.notificationAction}/>
            );
        }

        const action = (
            <span>
              {`${this.state.notificationAction} ${notification.__mad_tooter.source}'s`}
              &nbsp;
              <span className={classes.expander} onClick={this.toggleExpand(this)}>toot</span>
            </span>
        );

        return (
            <div className={classes.notification}>
              <TootHeader toot={notification} action={action} />
              <Collapse in={this.state.expanded} >
                <Paper className={classes.content} square
                       onClick={this.showNotificationStatus(notification)}>
                  <Typography type="body2" className="toot"
                              dangerouslySetInnerHTML={{__html: twemoji.parse(notification.status.spoiler_text)}} />
                  <Typography type="body1" className="toot" tabIndex={0}
                              dangerouslySetInnerHTML={{__html: twemoji.parse(notification.status.content)}} />
                </Paper>
              </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(NotificationCard);
