// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { red, lime, green, lightGreen } from 'material-ui/colors';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';


const styles = theme => ({
    card: {
        width: '100%',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    chip: {
        marginLeft: theme.spacing.unit,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class SimpleCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const classes = this.props.classes;
        const children = React.Children.toArray(this.props.children);

        function handleClick() {
            alert("Clicked");
        }

        let cardClasses = `${classes.card}`;

        let extraWidget = null;
        let extraIcon = null;
        if (this.props.boostedBy) {
            extraIcon = (
                <Icon className="toot-meta">share</Icon>
            )
            extraWidget = (
                <Chip classes={classes.chip}
                      label={this.props.boostedBy}
                      avatar={<Avatar>S</Avatar>}
                      className={classes.chip} />
            )
            cardClasses += " boosted";
        }

        if (this.props.favedBy) {
            extraIcon = (
                <Icon className="toot-meta">favorite</Icon>
            )
            extraWidget = (
                <Chip classes={classes.chip}
                      label={this.props.favedBy}
                      avatar={<Avatar>S</Avatar>}
                      className={classes.chip} />
            )
            cardClasses += " favourited";
        }

        return (
            <Card className={cardClasses}>
                <CardHeader
                  avatar={<Avatar className={classes.avatar}
                                  src="https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg" />}
                  title={<span>{this.props.authorName} <span className="disabled">{this.props.authorID}</span></span>}
                  onClick={handleClick}
                  subheader={this.props.statusTime}
                  />
                <CardContent>
                  <Typography type="body1">
                    {children}
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <Button dense>
                    <Icon>reply</Icon>
                  </Button>
                  <Button dense>
                    <Icon>repeat</Icon>
                  </Button>
                  <Button dense>
                    <Icon>star</Icon>
                  </Button>
                  <div className={classes.flexGrow} />
                  <IconButton
                    className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                    >
                    <Icon>expand_more</Icon>
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardActions>
                    <div className={classes.flexGrow} />
                    {extraIcon}
                    {extraWidget}
                    <Icon className="toot-meta">account_circle</Icon>
                    <Chip classes={classes.chip}
                          label="@algernon"
                          onClick={handleClick}
                          className={`${classes.chip} default-account`}
                          />
                    <Chip classes={classes.chip}
                          label="@another"
                          onClick={handleClick}
                          className={classes.chip}
                          />
                  </CardActions>
                </Collapse>
              </Card>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
