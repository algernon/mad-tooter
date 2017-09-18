// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { red, lime, green, lightGreen, pink } from 'material-ui/colors';
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
    content: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: 0,
        paddingBottom: 0,
    },
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit / 2,
    },
    actor: {
        display: 'flex',
        float: 'right',
    },
    boostActorChip: {
        backgroundColor: green.A400,
    },
    boostActorChipAvatar: {
        backgroundColor: green.A200,
    },
    favActorChip: {
        backgroundColor: pink.A100,
    },
    favActorChipAvatar: {
        backgroundColor: pink[100],
    },
    avatarIcon: {
        width: 'auto',
        height: 'auto',
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
        if (this.props.boostedBy) {
            extraWidget = (
                <Chip classes={classes.boostActorChip}
                      label={this.props.boostedBy}
                      avatar={<Avatar className={classes.boostActorChipAvatar}><Icon className={classes.avatarIcon}>share</Icon></Avatar>}
                      className={classes.boostActorChip} />
            )
            cardClasses += " boosted";
        }

        if (this.props.favedBy) {
            extraWidget = (
                <Chip classes={classes.favActorChip}
                      label={this.props.favedBy}
                      avatar={<Avatar className={classes.favActorChipAvatar}><Icon className={classes.avatarIcon}>favorite</Icon></Avatar>}
                      className={classes.favActorChip} />
            )
            cardClasses += " favourited";
        }

        return (
            <Card className={cardClasses}>
              <CardHeader
                className={classes.header}
                avatar={<Avatar className={classes.avatar}
                                src="https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg" />}
                title={<span>{this.props.authorName} <span className="disabled">{this.props.authorID}</span> <div className={classes.actor}> {extraWidget} </div> </span>}
                onClick={handleClick}
                subheader={this.props.statusTime} />
              <CardContent className={classes.content}>
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
              </Card>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
