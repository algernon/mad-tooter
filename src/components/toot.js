// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { red, lime, green, lightGreen, pink, yellow, orange, amber } from 'material-ui/colors';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';


const styles = theme => ({
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
    actionButton: {
        transition: 'color 0.3s ease',
        '&:hover': {
            color: theme.palette.secondary.A400,
        },
    },
    galleryImage: {
        cursor: 'zoom-in',
    },
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
        cursor: 'pointer',
    },
    media: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: 0,
        cursor: 'zoom',
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
        marginLeft: theme.spacing.unit,
        backgroundColor: green.A400,
        color: '#fafafa',
        '&:hover': {
            backgroundColor: green.A700,
        }
    },
    boostActorChipAvatar: {
        backgroundColor: green.A200,
    },
    mention: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
    },
    mentionAvatar: {
        backgroundColor: theme.palette.primary.A400,
        boxShadow: "0 0 0 0 rgba(29, 233, 182, 0.7)",
        animation: "pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)",
    },
    favActorChip: {
        marginLeft: theme.spacing.unit,
        backgroundColor: pink.A100,
        color: '#fafafa',
        '&:hover': {
            backgroundColor: pink.A200,
        }
    },
    favActorChipAvatar: {
        backgroundColor: pink[100],
    },
    avatarIcon: {
        width: 'auto',
        height: 'auto',
    },
    meta: {
        display: 'flex',
        paddingRight: theme.spacing.unit * 2,
    },
    cardSubHeader: {
        fontSize: "11px",
        lineHeight: "16px",
    },
    cardTitle: {
        lineHeight: "16px",
    },
});

class TootCard extends React.Component {
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

        let boostWidget = null;
        if (this.props.boostCount) {
            boostWidget = (
                <Chip classes={classes.boostActorChip}
                      label={this.props.boostCount}
                      avatar={<Avatar className={classes.boostActorChipAvatar}><Icon className={classes.avatarIcon}>share</Icon></Avatar>}
                      className={classes.boostActorChip} />
            )
            cardClasses += " boosted";
        }

        let favWidget = null;
        if (this.props.favCount) {
            favWidget = (
                <Chip classes={classes.favActorChip}
                      label={this.props.favCount}
                      avatar={<Avatar className={classes.favActorChipAvatar}><Icon className={classes.avatarIcon}>favorite</Icon></Avatar>}
                      className={classes.favActorChip} />
            )
            cardClasses += " favourited";
        }

        let mentionWidget = null;
        if (this.props.mentioned) {
            mentionWidget = (
                <div className={classes.mention}>
                  <Avatar className={classes.mentionAvatar}>
                    <Icon className={classes.avatarIcon}>notifications</Icon>
                  </Avatar>
                </div>
            )
        }

        let mediaWidget = null;
        if (this.props.withMedia) {
            mediaWidget = (
                <CardContent className={classes.media}>
                  <Paper square>
                    <GridList>
                      <GridListTile>
                        <a href="#">
                          <img className={classes.galleryImage}
                               src="https://trunk.mad-scientist.club/system/media_attachments/files/000/278/684/small/4abe59b20006b5fe.png?1505735848" /></a>
                      </GridListTile>
                      <GridListTile>
                        <a href="#">
                          <img className={classes.galleryImage}
                            src="https://trunk.mad-scientist.club/system/media_attachments/files/000/278/685/small/1be520e07214a553.png?1505735881" /></a>
                      </GridListTile>
                    </GridList>
                  </Paper>
                </CardContent>
            );
        }

        return (
            <Card className={cardClasses}>
              <CardHeader
                classes={{subheader: classes.cardSubHeader,
                          title: classes.cardTitle}}
                className={classes.header}
                avatar={<Avatar className={classes.avatar}
                                src="https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg" />}
                title={<span>
                       <span onClick={handleClick}>
                             {this.props.authorName}
                             <span className="disabled">{this.props.authorID}</span>
                       </span>
                           <div className={classes.actor}>
                                 {mentionWidget} {boostWidget} {favWidget}
                               </div>
              </span>}
                subheader={this.props.statusTime}
                />
              <CardContent className={classes.content}
                           onClick={handleClick}>
                  <Typography type="body1">
                    {children}
                  </Typography>
              </CardContent>
              {mediaWidget}
              <Divider className={classes.divider} />
              <CardActions disableActionSpacing>
                <Button dense className={classes.actionButton}>
                  <Icon>reply</Icon>
                </Button>
                <Button dense className={classes.actionButton}>
                  <Icon>repeat</Icon>
                </Button>
                <Button dense className={classes.actionButton}>
                  <Icon>star</Icon>
                </Button>
                <div className={classes.flexGrow} />
                <div className={classes.meta}>
                  <Chip classes={classes.chip}
                        avatar={<Avatar className="default-account"><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                          label="@algernon"
                          onClick={handleClick}
                          className={`${classes.chip}`}
                          />
                    <Chip classes={classes.chip}
                          avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                          label="@another"
                          onClick={handleClick}
                          className={classes.chip}
                          />
                  </div>
                </CardActions>
              </Card>
        );
    }
}

TootCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TootCard);
