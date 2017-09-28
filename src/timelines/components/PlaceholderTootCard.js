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
import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import BorderClearIcon from 'material-ui-icons/BlurOn';
import PersonIcon from 'material-ui-icons/Person';

const styles = theme => ({
    toot: {
        width: "100%",
        opacity: 0.25,
        filter: 'blur(1px) contrast(125%)',
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
    },
});

const headerStyles = theme => ({
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit / 2,
    },
    subHeader: {
        fontSize: "11px",
        lineHeight: "16px",
        filter: 'blur(2px)',
    },
    title: {
        lineHeight: "16px",
    },
    author: {
        filter: 'blur(3px)',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '& .disabled': {
            marginLeft: theme.spacing.unit,
        },
    },
})

const TootHeaderEmpty = withStyles(headerStyles)((props) => {
    const { classes } = props;

    const avatar = (
        <Avatar>
          <PersonIcon />
        </Avatar>
    );

    const title = (
        <span className={classes.author}>
          <span className="author">Some random person</span>
          <span className="disabled">@username</span>
        </span>
    );

    const subheader = (
        <div>
          <span>a few seconds ago</span>
        </div>
    );

    return (
        <CardHeader
          classes={{subheader: classes.subHeader, title: classes.title}}
          className={classes.header}
          avatar={avatar}
          title={title}
          subheader={subheader} />
    );
});

class PlaceholderTootCard extends React.Component {
    render () {
        const { classes } = this.props;

        return (
            <Card className={classes.toot}>
              <TootHeaderEmpty />

              <CardContent className={classes.content} style={{
                               height: Math.round(Math.random() * 100 + 25),
                           }} >
                <Typography type="body1" className="toot" / >
              </CardContent>

              <CardActions disableActionSpacing>
                <Button dense disabled>
                  <BorderClearIcon />
                </Button>
                <Button dense disabled>
                  <BorderClearIcon />
                </Button>
                <Button dense disabled>
                  <BorderClearIcon />
                </Button>
               <div className={classes.flex} />
                <div className={classes.meta}>
                  <Chip avatar={<Avatar><PersonIcon /></Avatar>}
                        label={<span style={{filter: "blur(2px)"}}>@source</span>} />
                </div>
              </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(PlaceholderTootCard);
