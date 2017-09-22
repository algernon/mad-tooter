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
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Dialog, { DialogTitle, DialogContent, DialogActions, withResponsiveFullScreen } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';

import Slide from 'material-ui/transitions/Slide';

import { AppState } from '../../app/State';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        position: 'fixed',
        right: 0,
        bottom: 0,
    },
    dialog: {
        marginTop: 48,
    },
    tootIconButton: {
        minWidth: '100%',
    },
    tootingAs: {
        display: 'flex',
        justifyContent: 'flex-end',
        float: 'right',
    },
    avatarIcon: {
        width: 'auto',
        height: 'auto',
    },
    flex: {
        flex: 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    tootText: {
        minWidth: 'calc(100% - 64px)',
    },
    tootActions: {
        display: 'flex',
    },
});

class TootDialog extends React.Component {
    state = {
        tootText: "",
    };

    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    postToot = () => {
        AppState.api.post(this.state.tootText);
        this.setState({tootText: ""});
        this.handleRequestClose();
    }

    cancelToot = () => {
        this.setState({tootText: ""});
        this.handleRequestClose();
    }

    render() {
        const { classes, onRequestClose, ...other } = this.props;

        return (
            <Dialog onRequestClose={this.handleRequestClose}
                    transition={<Slide direction="up" />}
                    {...other}>
              <DialogTitle>
                <AppBar>
                  <Toolbar>
                    <IconButton className={classes.menuButton} color="contrast" aria-label="Close"
                                onClick={this.handleRequestClose}>
                      <Icon>close</Icon>
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                      Toot
                    </Typography>
                    <div className={classes.tootingAs}>
                      <Chip label={AppState.api.key}
                            avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>} />
                    </div>
                  </Toolbar>
                </AppBar>
              </DialogTitle>
              <DialogContent className={classes.dialog}>
                <form className={classes.container} autoComplete="off">
                  <FormControl className={classNames(classes.formControl, classes.tootText)}>
                    <TextField autoFocus multiline
                               rows={6}
                               value={this.state.tootText}
                               onChange={(e) => {this.setState({tootText: e.target.value});}}
                      placeholder="What is on your mind?"/>
                  </FormControl>
                  <FormControl className={classes.tootActions}>
                    <Button dense className={classes.tootIconButton} disabled>
                      <Icon>camera_alt</Icon>
                    </Button>
                    <Button dense className={classes.tootIconButton} disabled>
                      <Icon>public</Icon>
                    </Button>
                    <Button dense className={classes.tootIconButton} disabled>
                      <Icon>vignette</Icon>
                    </Button>
                  </FormControl>
                </form>

              </DialogContent>
              <DialogActions>
                <Button dense onClick={this.cancelToot}>
                  Cancel
                </Button>
                <Button color="primary" raised dense onClick={this.postToot}>
                  Toot!
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}
TootDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func,
};
TootDialog = withStyles(styles)(TootDialog);
TootDialog = withResponsiveFullScreen()(TootDialog);

class TootComposeButton extends React.Component {
    static defaultProps: {};
    state = {
        open: false,
    };

    handleRequestClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    render () {
        const classes = this.props.classes;
        return (
            <div>
              <Button fab color="accent" aria-label="add" className={classes.button}
                      onClick={() => this.setState({ open: true })} >
                <Icon color="contrast">add</Icon>
              </Button>
              <TootDialog
                open={this.state.open}
                onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}

TootComposeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TootComposeButton);
