// @flow
// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip';

export const staticItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Tooltip label="Search" placement="bottom">
            <Icon>search</Icon>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Tooltip label="Home" placement="right">
            <Icon color="accent">home</Icon>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Timeline" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon>people</Icon>
        </ListItemIcon>
        <ListItemText primary="Mentions" />
      </ListItem>
    </div>
);

export const timeLineItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Icon>domain</Icon>
        </ListItemIcon>
        <ListItemText primary="Timeline"
                      secondary="Local" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon>public</Icon>
        </ListItemIcon>
        <ListItemText primary="Timeline"
                      secondary="Federated" />
      </ListItem>
    </div>
);
