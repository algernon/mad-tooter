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
    </div>
);

export const timeLineItems = (
    <div>
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
    </div>
);
