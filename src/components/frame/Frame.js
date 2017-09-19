/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import TootComposeButton from '../toot/ComposeButton';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflowY: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    list: {
        flex: "none",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        transition: theme.transitions.create(['color'], {
            easing: theme.transitions.easing.ease,
            duration: theme.transitions.duration.longest,
        }),
        '&:hover': {
            color: theme.palette.primary.A100,
        },
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'fixed',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
    flex: {
        flex: 1,
    },
    titleButton: {
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
});

class TooterFrame extends React.Component {
    state = {
        sidebarOpen: false,
    };

    handleSidebarOpen = () => {
        this.setState({ sidebarOpen: true });
    };

    handleSidebarClose = () => {
        this.setState({ sidebarOpen: false });
    };

    render() {
        const classes = this.props.classes;
        const children = React.Children.toArray(this.props.children);

        return (
            <div className={classes.root}>
              <div className={classes.appFrame}>
                <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)} color="primary">
                  <Toolbar disableGutters>
                    <IconButton
                      color="contrast"
                      aria-label="open drawer"
                      className={classes.menuButton}
                      onClick={this.handleSidebarOpen}>
                      <Icon>whatshot</Icon>
                    </IconButton>
                    <div className={classes.flex}>
                      <Button color="contrast"
                              className={classes.titleButton}
                              onClick={() => { document.getElementsByTagName("main")[0].scrollTop = 0; }}>
                        <Typography type="title" color="inherit" noWrap>
                          Firehose
                        </Typography>
                      </Button>
                    </div>
                    <TextField
                      id="search"
                      type="search"
                      placeholder="Search text..."
                      className={classes.textField}
                      margin="dense"
                      disabled />
                    <IconButton color="default" disabled>
                      <Icon>search</Icon>
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Drawer type="temporary"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        open={this.state.sidebarOpen} >
                  <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                      <IconButton onClick={this.handleSidebarClose}>
                        <ChevronLeftIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Divider />
                  <List className={classes.list}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon color="accent">whatshot</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Firehose" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon>people</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Mentions" />
                    </ListItem>
                  </List>
                  <Divider />
                  <List className={classes.list}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon>domain</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Local timeline" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon>public</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Federated timeline" />
                    </ListItem>
                  </List>
                  <Divider />
                  <List className={classes.list}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon>settings</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItem>
                  </List>
                </Drawer>
                <main className={classes.content}>
                  {children}
                  <TootComposeButton config={this.props.config} />
                </main>
              </div>
            </div>
        );
    }
}

TooterFrame.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TooterFrame);
