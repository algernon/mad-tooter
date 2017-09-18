/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListSubheader, ListItem } from 'material-ui/List';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { staticItems, timeLineItems } from './tileData';
import SimpleCard from './toot';
import TootButton from './tootButton';

const drawerWidth = 170;

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
      marginLeft: 60,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 48px)',
      marginTop: 48,
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
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Timeline
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
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
            <List className={classes.list}>{staticItems}</List>
            <Divider />
            <List className={classes.list}>{timeLineItems}</List>
          </Drawer>
          <main className={classes.content}>
            <List className={classes.list} width="100%" dense>
              <ListItem>
                <SimpleCard authorName="Gergely Nagy"
                            authorID="@algernon"
                            statusTime="2017-09-16 15:05:05"
                            favedBy="someone">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </SimpleCard>
              </ListItem>
              <ListItem>
                <SimpleCard authorName="Gergely Nagy"
                            authorID="@algernon"
                            statusTime="2017-09-16 15:05:05"
                            boostedBy="someone">
                  Something wicked this way comes.
                </SimpleCard>
              </ListItem>
              <ListItem>
                <SimpleCard authorName="Gergely Nagy"
                            authorID="@algernon"
                            statusTime="2017-09-16 15:05:05">
                  Something in the way
                </SimpleCard>
              </ListItem>

              <ListItem>
                <SimpleCard authorName="Gergely Nagy"
                            authorID="@algernon"
                            statusTime="2017-09-16 15:05:05">
                  Something in the way
                </SimpleCard>
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
