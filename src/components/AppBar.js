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

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import SettingsIcon from 'material-ui-icons/Settings';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class _AppBar extends React.Component {
    state = {
        sidebarOpen: false,
    };

    handleSidebarToggle = self => e => {
        self.setState((prevState, props) => ({
            sidebarOpen: !prevState.sidebarOpen,
        }));
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
              <AppBar className={classNames(classes.appBar, this.state.sidebarOpen && classes.appBarShift)} color="primary">
                <Toolbar disableGutters>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    className={classes.menuButton}
                    onClick={this.handleSidebarToggle(this)}>
                    {this.props.icon}
                  </IconButton>

                  {this.props.toolbar}
                </Toolbar>
              </AppBar>
              <Drawer type="temporary"
                      classes={{
                          paper: classes.drawerPaper
                      }}
                      open={this.state.sidebarOpen} >
                <div className={classes.drawerInner}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleSidebarToggle(this)}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                </div>
                <Divider />
                {this.props.drawerItems}
                <Divider />
                <List className={classes.list}>
                  <ListItem button>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </List>
              </Drawer>
            </div>
        );
    }
};

export default withStyles(styles)(_AppBar);
