/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListSubheader, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import TootCard from './toot';
import TootButton from './tootButton';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Tooltip from 'material-ui/Tooltip';

const drawerWidth = 240;

const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
    zIndex: 1,
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
    marginLeft: 12,
    marginRight: 36,
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
    height: 'calc(100% - 48px)',
      marginTop: 48,
      //marginLeft: 60,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 48px)',
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
        },
    },
});

class MiniDrawer extends React.Component {
  state = {
      open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)} color="primary">
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                className={classes.menuButton}
                onClick={this.handleDrawerOpen}>
                <Icon>whatshot</Icon>
              </IconButton>
              <div className={classes.flex}>
                <Button color="contrast"
                        className={classes.titleButton}>
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
                />
              <IconButton color="default">
                <Icon>search</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            type="temporary"
            classes={{
                paper: classes.drawerPaper
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
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
          </Drawer>
          <main className={classes.content}>
            <List className={classes.list} width="100%" dense>
              <ListItem>
                <TootCard authorName="Gergely Nagy" withMedia
                            authorID="@algernon"
                          statusTime="2017-09-16 15:05:05"
                          favCount="100"
                          boostCount="10"
                          mentioned>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    <Tooltip label="algernon@trunk.mad-scientist.club" placement="bottom">
                      <span className="h-card">
                        <a href="#" className="u-url mention">@<span>algernon</span></a>
                      </span>
                    </Tooltip>
                  </p>
                </TootCard>
              </ListItem>
              <ListItem>
                <TootCard authorName="Gergely Nagy"
                          authorID="@algernon"
                          statusTime="2017-09-16 15:05:05"
                          favCount="10">
                  Something wicked this way comes.
                </TootCard>
              </ListItem>
              <ListItem>
                <TootCard authorName="Gergely Nagy"
                          authorID="@algernon"
                          statusTime="2017-09-16 15:05:05"
                          boostCount="2">
                  Something in the way
                </TootCard>
              </ListItem>

              <ListItem>
                <TootCard authorName="Gergely Nagy"
                            authorID="@algernon"
                            statusTime="2017-09-16 15:05:05">
                  Something in the way
                </TootCard>
              </ListItem>

            </List>
            <TootButton />
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniDrawer);
