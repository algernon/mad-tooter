// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        position: 'fixed',
        right: 0,
        bottom: 0,
    },
});

function TootButton(props) {
    const classes = props.classes;
    return (
        <Button fab color="accent" aria-label="add" className={classes.button}>
          <Icon color="contrast">add</Icon>
        </Button>
    );
}

TootButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TootButton);
