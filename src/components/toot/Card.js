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
    onButton: {
        color: theme.palette.secondary.A400,
        '&:hover': {
            color: theme.palette.text.primary,
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
    mention: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
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

class TootAge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: props.time,
                      age: moment(props.time).fromNow()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({age: moment(this.props.time).fromNow()});
    }

    render() {
        return (
            <span>{this.state.age}</span>
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
              <TootAge time={props.toot.created_at} />
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
                          config={this.props.config}
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

              <CardActions disableActionSpacing>
                <Button dense className={classes.actionButton} disabled>
                  <Icon>reply</Icon>
                </Button>
                <Button dense
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: this.props.toot.reblogged,
                        })} disabled>
                  <Icon>repeat</Icon>
                </Button>
                <Button dense disabled
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: this.props.toot.favourited,
                        })}>
                  <Icon>star</Icon>
                </Button>
                <div className={classes.flexGrow} />
                <div className={classes.meta}>
                  <Chip avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                        label={this.props.config.api.key}
                        className={classes.chip} />
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
