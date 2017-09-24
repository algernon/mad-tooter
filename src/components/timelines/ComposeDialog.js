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
import classNames from 'classnames';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Dialog, { DialogTitle, DialogContent, DialogActions, withResponsiveFullScreen } from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import CameraAltIcon from 'material-ui-icons/CameraAlt';
import CloseIcon from 'material-ui-icons/Close';
import PersonIcon from 'material-ui-icons/Person';
import PublicIcon from 'material-ui-icons/Public';
import VignetteIcon from 'material-ui-icons/Vignette';

import { postToot } from '../../actions/Mastodon';
import store from '../../store';
import TootReplyCard from './TootReplyCard';

const maxTootLength = 500;

const styles = theme => ({
    flex: {
        flex: 1
    },
    content: {
        marginTop: 48,
    },
    replyTo: {
        marginTop: 48,
        flex: 'none',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    tootText: {
        minWidth: 'calc(100% - 64px)',
    },
    actions: {
        display: 'flex',
        '& button': {
            minWidth: '100%',
        },
    },
    error: {
        color: theme.palette.error[500],
    },
    replyContent: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: 0,
        paddingBottom: 0,
    },
    toot: {
        backgroundColor: theme.palette.background.contentFrame,
    },
});

class ComposeDialog extends React.Component {
    handleRequestClose = () => {
        store.dispatch({type: 'COMPOSE_HIDE'})
    };

    postToot = () => {
        postToot({
            status: this.state.tootText,
            in_reply_to_id: this.props.replyTo && this.props.replyTo.id,
        });

        this.handleRequestClose();
    }

    cancelToot = () => {
        store.dispatch({type: 'COMPOSE_CANCEL'});
    }

    tootLength = () => {
        return this.props.text.length;
    }

    render() {
        const { classes, defaultAccount, dispatch, show, title, replyTo, text, ...other } = this.props;

        return (
            <Dialog onRequestClose={this.handleRequestClose}
                    open={show}
                    transition={<Slide direction="up" />}
                    {...other} >
              <DialogTitle>
                <AppBar>
                  <Toolbar>
                    <IconButton color="contrast" aria-label="Close"
                                onClick={this.handleRequestClose}>
                      <CloseIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                      {title || "Toot"}
                    </Typography>
                    <Chip label={defaultAccount}
                          avatar={<Avatar><PersonIcon /></Avatar>} />
                  </Toolbar>
                </AppBar>
              </DialogTitle>
              <TootReplyCard toot={replyTo} />
              <DialogContent className={replyTo ? null : classes.content}>
                <form className={classes.form} autoComplete="none">
                  <FormControl className={classNames(classes.formControl, classes.tootText)}>
                    <TextField autoFocus multiline
                               rows={10}
                               value={this.props.text}
                               onChange={(e) => {store.dispatch({type: 'COMPOSE_SET_TEXT', text: e.target.value});}}
                      placeholder="What is on your mind?"/>
                  </FormControl>
                  <FormControl className={classes.actions}>
                    <Button dense disabled>
                      <CameraAltIcon />
                    </Button>
                    <Button dense disabled>
                      <PublicIcon />
                    </Button>
                    <Button dense disabled>
                      <VignetteIcon />
                    </Button>
                    <Button dense disabled classes={{label: this.tootLength() > maxTootLength && classes.error}}>
                      {maxTootLength - this.tootLength()}
                    </Button>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button dense onClick={this.cancelToot}>
                  Cancel
                </Button>
                <Button dense raised
                        disabled={this.tootLength() === 0 || this.tootLength() > maxTootLength}
                        color="primary"
                        onClick={this.postToot}>
                  Toot!
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

ComposeDialog = withStyles(styles)(withResponsiveFullScreen()(ComposeDialog));

const stateToProps = ({ configuration, compose }) => ({
    defaultAccount: Object.keys(configuration.mastodon)[0],
    show: compose.show,
    title: compose.title,
    replyTo: compose.replyTo,
    text: compose.text,
});

export default connect(stateToProps)(ComposeDialog);
