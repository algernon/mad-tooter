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

import Avatar from 'material-ui/Avatar';
import Card, { CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

import PersonIcon from 'material-ui-icons/Person';

import TootHeader from './card/TootHeader';
import TootReplyCard from './TootReplyCard';

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
        paddingTop: 0,
        paddingBottom: 0,
        cursor: 'pointer',
    },
    targetToot: {
        marginTop: theme.spacing.unit,
    },
});

class NotificationCard extends React.Component {
    render () {
        const { classes, notification } = this.props;

        if (!notification)
            return null;

        let notificationType = null;
        switch (notification.type) {
        case "favourite":
            notificationType = "favourited";
            break;
        case "reblog":
            notificationType = "boosted";
            break;
        case "mention":
            notificationType = "mentioned you";
            break;
        default:
            break;
        }

        return (
            <Card className={classes.notification}>
              <TootHeader toot={notification} action={notificationType} />
              <TootReplyCard toot={notification.status} className={classes.targetToot} />

              <CardActions disableActionSpacing>
                <div className={classes.flex} />
                <div className={classes.meta}>
                  <Chip avatar={<Avatar><PersonIcon /></Avatar>}
                        label={notification.__mad_tooter && notification.__mad_tooter.source} />
                </div>
              </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(NotificationCard);
