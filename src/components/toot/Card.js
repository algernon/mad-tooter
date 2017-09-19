// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { green, pink } from 'material-ui/colors';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import Collapse from 'material-ui/transitions/Collapse';

import moment from 'moment';

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
    cardVia: {
        opacity: '0.5',
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
                <Paper elevation={0} square className={classes.slideInInfo}>
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

class BoostWidget extends React.Component {
    render () {
        const props = this.props;

        let reblog_count = props.toot.reblogs_count;
        if (props.toot.reblogged)
            reblog_count++;
        if (!reblog_count)
            return null;

        const avatar = (
            <Avatar className={props.classes.boostActorChipAvatar}>
              <Icon className={props.classes.avatarIcon}>share</Icon>
            </Avatar>
        );

        return (
            <Chip label={reblog_count}
                  avatar={avatar}
                  className={props.classes.boostActorChip} />
        );
    }
}

class FavWidget extends React.Component {
    render() {
        const props = this.props;

        let fav_count = props.toot.favourites_count;
        if (props.toot.favourited)
            fav_count++;
        if (!fav_count)
            return null;

        const avatar = (
            <Avatar className={props.classes.favActorChipAvatar}>
              <Icon className={props.classes.avatarIcon}>favorite</Icon>
            </Avatar>
        );

        return (
            <Chip label={fav_count}
                  avatar={avatar}
                  className={props.classes.favActorChip} />
        );
    }
}

class MentionWidget extends React.Component {
    render () {
        const props = this.props;
        if (!props.mentions || props.mentions.length === 0)
            return null;

        let mentioned = false;
        props.mentions.forEach((mention) => {
            if (mention.url === "https://trunk.mad-scientist.club/@algernon")
                mentioned = true;
        })

        if (!mentioned)
            return null;

        return (
            <div className={props.classes.mention}>
              <Avatar className={props.classes.mentionAvatar}>
                <Icon className={props.classes.avatarIcon}>notifications</Icon>
              </Avatar>
            </div>
        )
    }
}

class MediaGallery extends React.Component {
    render() {
        const props = this.props;

        if (!props.media)
            return null;

        const classes=props.classes;

        return (
            <CardContent className={classes.media}>
              <Paper square>
                <GridList cellHeight={110}>
                  {props.media.map(medium => (
                      <GridListTile key={`media-${medium.id}`}>
                        <a href={medium.url}>
                          <img className={classes.galleryImage} alt=""
                               src={medium.preview_url} />
                        </a>
                      </GridListTile>))}
                </GridList>
              </Paper>
            </CardContent>
        );
    }
}

class TootCardHeader extends React.Component {
    render () {
        const props = this.props;
        const classes = props.classes;

        const avatar = (
            <Avatar className={classes.avatar}
                    src={props.toot.account.avatar} />
        );

        let via = null;
        if (props.via) {
            via = (
                <span className={classnames(classes.cardAuthor, classes.cardVia)}>
                  &nbsp; via {props.via.account.display_name}
                </span>
            );
        }

        const title = (
            <span>
              <span className={classes.cardAuthor}>
                <span className="author">{props.toot.account.display_name}</span>
                <span className="disabled">{props.toot.account.acct}</span>
              </span>
            </span>
        );

        const subheader = (
            <div>
              {moment(props.toot.created_at).fromNow()}
              {via}
            </div>
        );

        return (
            <CardHeader
              classes={{subheader: classes.cardSubHeader, title: classes.cardTitle}}
              className={classes.header}
              avatar={avatar}
              title={title}
              subheader={subheader} />
        );
    }
}
TootCardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
TootCardHeader = withStyles(styles)(TootCardHeader);

class TootCard extends React.Component {
    state = {
        spoilerShown: false,
    };

    spoilerToggle = (e) => {
        this.setState({ spoilerShown: !this.state.spoilerShown });
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    render() {
        if (!this.props.toot)
            return null;

        const classes = this.props.classes;

        function handleClick () {
            alert("Clicked");
        }

        if (this.props.toot.reblog) {
            return (
                <TootCard toot={this.props.toot.reblog}
                          via={this.props.toot}
                          classes={classes} />
            );
        }

        let spoiler = null;
        if (this.props.toot.spoiler_text) {
            let moreOrLess = "more";
            if (this.state.spoilerShown)
                moreOrLess = "less";

            spoiler = (
                <div>
                  <Typography type="body1"
                              dangerouslySetInnerHTML={{__html: this.props.toot.spoiler_text}} />
                  <Button onClick={this.spoilerToggle} raised>
                    Show {moreOrLess}
                  </Button>
                </div>
            );
        }

        return (
            <Card className={classes.card}>
              <TootCardHeader toot={this.props.toot}
                              via={this.props.via} />

              <CardContent className={classes.content}
                           onClick={handleClick}>
                {spoiler}
                <Collapse in={spoiler == null || this.state.spoilerShown} transitionDuration="auto" unmountOnExit>
                  <Typography type="body1"
                              dangerouslySetInnerHTML={{__html: this.props.toot.content}} />
                </Collapse>
              </CardContent>

              <MediaGallery media={this.props.toot.media_attachments}
                            classes={classes} />

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
                  <SlideInInfo classes={classes}>
                    <MentionWidget mentions={this.props.toot.mentions} classes={classes} />
                    <BoostWidget toot={this.props.toot} classes={classes}/>
                    <FavWidget toot={this.props.toot} classes={classes} />

                    <Chip avatar={<Avatar className="default-account"><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                          label="@algernon"
                          onClick={handleClick}
                          className={classes.chip} />
                    <Chip avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                          label="@another"
                          onClick={handleClick}
                          className={classes.chip} />
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
