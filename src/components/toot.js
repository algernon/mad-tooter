// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
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
import Slide from 'material-ui/transitions/Slide';

import Popover from 'material-ui/Popover';
import Drawer from 'material-ui/Drawer';

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
        transition: theme.transitions.create(['transform', 'color'], {
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
        cursor: 'pointer',
    },
    cardAuthor: {
        '&:hover .author': {
            textDecoration: 'underline',
        },
        '& .disabled': {
            marginLeft: theme.spacing.unit,
        },
    },
    avatar: {
        cursor: 'pointer',
    },
    slideInInfo: {
        display: 'inline-flex',
    },
});

class SlideInInfo extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const classes = this.props.classes;
        const children = React.Children.toArray(this.props.children);

        return (
            <div>
              <Slide in={this.state.expanded} direction="right">
                <Paper elevation="0" square className={classes.slideInInfo}>
                  {children}
                </Paper>
              </Slide>
              <IconButton onClick={this.handleExpandClick}
                          className={classnames(classes.expand, {
                              [classes.expandOpen]: this.state.expanded,
                          })}>
                <Icon>keyboard_arrow_right</Icon>
              </IconButton>
            </div>
        );
    }
}
SlideInInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
SlideInInfo = withStyles(styles)(SlideInInfo);

function BoostWidget(props) {
    if (!props.boostCount)
        return null;

    const avatar = (
        <Avatar className={props.classes.boostActorChipAvatar}>
          <Icon className={props.classes.avatarIcon}>share</Icon>
        </Avatar>
    );

    return (
        <Chip classes={props.classes.boostActorChip}
              label={props.boostCount}
              avatar={avatar}
              className={props.classes.boostActorChip} />
    );
}
BoostWidget.propTypes = {
    classes: PropTypes.object.isRequired,
};
BoostWidget = withStyles(styles)(BoostWidget);

function FavWidget(props) {
    if (!props.favCount)
        return null;

    const avatar = (
        <Avatar className={props.classes.favActorChipAvatar}>
          <Icon className={props.classes.avatarIcon}>favorite</Icon>
        </Avatar>
    );

    return (
        <Chip classes={props.classes.favActorChip}
              label={props.favCount}
              avatar={avatar}
              className={props.classes.favActorChip} />
    );
}
FavWidget.propTypes = {
    classes: PropTypes.object.isRequired,
};
FavWidget = withStyles(styles)(FavWidget);

function MentionWidget (props) {
    if (!props.mentioned)
        return null;

    return (
        <div className={props.classes.mention}>
          <Avatar className={props.classes.mentionAvatar}>
            <Icon className={props.classes.avatarIcon}>notifications</Icon>
          </Avatar>
        </div>
    )
}
MentionWidget.propTypes = {
    classes: PropTypes.object.isRequired,
};
MentionWidget = withStyles(styles)(MentionWidget);

function MediaGallery(props) {
    if (!props.withMedia)
        return null;

    const classes=props.classes;

    return (
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
MediaGallery.propTypes = {
    classes: PropTypes.object.isRequired,
};
MediaGallery = withStyles(styles)(MediaGallery);

function TootCardHeader(props) {
    const classes = props.classes;

    const avatar = (
        <Avatar className={classes.avatar}
                src="https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg" />
    );

    const title = (
        <span>
          <span className={classes.cardAuthor}>
            <span className="author">{props.authorName}</span>
            <span className="disabled">{props.authorID}</span>
          </span>
          <div className={classes.actor}>
            <SlideInInfo>
              <MentionWidget mentioned={props.mentioned} />
              <BoostWidget boostCount={props.boostCount} />
              <FavWidget favCount={props.favCount} />
            </SlideInInfo>
          </div>
        </span>
    )

    return (
        <CardHeader
          classes={{subheader: classes.cardSubHeader,
          title: classes.cardTitle}}
          className={classes.header}
          avatar={avatar}
          title={title}
          subheader={props.statusTime} />
    );
}
TootCardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
TootCardHeader = withStyles(styles)(TootCardHeader);

class TootCard extends React.Component {
    render() {
        const classes = this.props.classes;
        const children = React.Children.toArray(this.props.children);

        function handleClick () {
            alert("Clicked");
        }

        return (
            <Card className={classes.card}>
              <TootCardHeader {...this.props} />

              <CardContent className={classes.content}
                           onClick={handleClick}>
                <Typography type="body1">
                  {children}
                </Typography>
              </CardContent>

              <MediaGallery withMedia={this.props.withMedia} />

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
                  <SlideInInfo>
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
                  </SlideInInfo>
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
