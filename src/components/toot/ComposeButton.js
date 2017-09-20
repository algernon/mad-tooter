// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Dialog, { DialogTitle, DialogContent, DialogActions, withResponsiveFullScreen } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import { config } from '../../config/config';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        position: 'fixed',
        right: 0,
        bottom: 0,
    },
    dialog: {
        width: '100%',
    },
    tootIconButton: {
        minWidth: '100%',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    divider: {
        height: 24,
        marginRight: theme.spacing.unit * 2,
        minWidth: theme.spacing.unit * 3,
        borderRight: "1px solid rgba(0, 0, 0, 0.87)",
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
});

class TootDialog extends React.Component {
    state = {
        tootText: "",
    };

    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    postToot = () => {
        config.api.post(this.state.tootText);
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
            <Dialog onRequestClose={this.handleRequestClose} {...other}
                    classes={{
                        paper: classes.dialog
                    }}>
              <DialogTitle>
                Toot
                <div className={classes.tootingAs}>
                  <Chip label={config.api.key}
                        avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>} />
                </div>
              </DialogTitle>
              <DialogContent>
                <TextField autoFocus fullWidth multiline
                           rows="6"
                           value={this.state.tootText}
                           onChange={(e) => {this.setState({tootText: e.target.value});}}
                           placeholder="What is on your mind?"/>
              </DialogContent>
              <DialogActions>
                <Button dense className={classes.tootIconButton} disabled>
                  <Icon>camera_alt</Icon>
                </Button>
                <Button dense className={classes.tootIconButton} disabled>
                  <Icon>public</Icon>
                </Button>
                <Button dense className={classes.tootIconButton} disabled>
                  <Icon>vignette</Icon>
                </Button>
                <div className={classes.divider} />
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
