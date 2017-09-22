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
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Slide from 'material-ui/transitions/Slide';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import moment from 'moment';

import twemoji from 'twemoji';

import { AppState } from '../../app/State';

const styles = theme => ({
    flex: {
        flex: 1,
    },
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
        padding: theme.spacing.unit / 2,
        margin: theme.spacing.unit / 2,
        height: 'fit-content',
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
    mediaGallery: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit,
        justifyContent: 'center',
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
        textDecoration: 'none',
        color: theme.palette.text.primary,
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
    gallery: {
    },
    dialogContent: {
        marginTop: 64 + theme.spacing.unit,
    },
    tootAge: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        'a&:hover': {
            textDecoration: 'underline',
        },
    }
});

class MediaViewer extends React.Component {
    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    render() {
        const { src, classes, open, startIndex, onRequestClose, images, ...other } = this.props;

        return (
            <Dialog fullScreen
                    transition={<Slide direction="up" />}
                    open={open}
                    onRequestClose={this.handleRequestClose} {...other}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                    <Icon>close</Icon>
                  </IconButton>
                  <Typography type="title" color="inherit" className={classes.flex}>
                    Image viewer
                  </Typography>
               </Toolbar>
              </AppBar>
              <DialogContent className={classes.dialogContent}>
                <ImageGallery
                  className={classes.gallery}
                  items={images}
                  showThumbnails={false}
                  showPlayButton={false}
                  startIndex={startIndex}
                  {...other} />
              </DialogContent>
            </Dialog>
        );
    }
}

class MediaGalleryItem extends React.Component {
    render () {
        const maxWidth = 300;

        let width = null;
        let height = null;

        if (this.props.image.meta) {
            width = this.props.image.meta.small.width;
            height =  this.props.image.meta.small.height;

            if (width > maxWidth) {
                height = Math.round((maxWidth / width) * height);
                width = maxWidth;
            }
        }

        return (
            <Paper square className={this.props.classes.galleryImage}>
              <img alt=""
                   onClick={this.props.onClick}
                   width={width} height={height}
                   src={this.props.image.preview_url} />
            </Paper>
        )
    }
}
MediaGalleryItem = withStyles(styles)(MediaGalleryItem);

class MediaGallery extends React.Component {
    state = {
        mediaViewOpen: false,
        mediaViewIndex: 0,
    }

    openMediaView = index => e => {
        this.setState({mediaViewOpen: true,
                       mediaViewIndex: index});
    }

    closeMediaView = () => {
        this.setState({mediaViewOpen: false,
                       mediaViewIndex: 0});
    }

    render() {
        const props = this.props;

        if (!props.media || !props.media.length)
            return null;

        const classes=props.classes;

        const images = props.media.map(medium => {
            return {original: medium.url, thumbnail: medium.preview_url};
        });

        return (
            <div>
              <MediaViewer src={this.state.mediaViewURL}
                           open={this.state.mediaViewOpen}
                           images={images}
                           onRequestClose={this.closeMediaView}
                           classes={classes}
                           startIndex={this.state.mediaViewIndex} />

              <CardContent>
                <Divider />
                <div className={classes.mediaGallery}>
                  {props.media.map((medium, idx) => (
                      <MediaGalleryItem onClick={this.openMediaView(idx)}
                                        image={medium}
                                        key={`media-${medium.id}`} />))}
                </div>
              </CardContent>
            </div>
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
        if (this.props.href !== null) {
            return (
                <a href={this.props.href} className={this.props.classes.tootAge}
                   target="_blank">{this.state.age}</a>
            );
        } else {
            return (
                <span className={this.props.classes.tootAge}>{this.state.age}</span>
            );
        }
    }
}
TootAge = withStyles(styles)(TootAge);

class TootCardHeader extends React.Component {
    showAccount = account => e => {
        e.preventDefault();
        console.log("showAccount", account);
    }

    render () {
        const props = this.props;
        const classes = props.classes;

        const avatar = (
            <Avatar className={classes.avatar}
                    component="a"
                    onClick={this.showAccount(props.toot.account)}
                    href={props.toot.account.url}
                    src={props.toot.account.avatar} />
        );

        let via = null;
        if (props.via) {
            via = (
                <span className={classnames(classes.cardAuthor, classes.cardVia)}>
                  &nbsp;via&nbsp;
                  <a href={props.via.account.url}
                     className={classnames(classes.cardAuthor, classes.cardVia)}
                     onClick={this.showAccount(props.via.account)}
                     dangerouslySetInnerHTML={{__html:twemoji.parse(props.via.account.display_name) || props.via.account.username}} />
                  ,&nbsp;
                  <TootAge time={props.via.created_at} href={props.via.url} />
                </span>
            );
        }

        const title = (
            <a href={props.toot.account.url} className={classes.cardAuthor}
               onClick={this.showAccount(props.toot.account)}>
              <span className="author"
                    dangerouslySetInnerHTML={{__html:twemoji.parse(props.toot.account.display_name) || props.toot.account.username}} />
              <span className="disabled">{props.toot.account.acct}</span>
            </a>
        );

        const subheader = (
            <div>
              <TootAge time={props.toot.created_at} href={props.toot.url} />
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
    constructor(props) {
        super(props);

        let toot = props.toot;
        if (toot.reblog) {
            toot.reblog.__mad_tooter = toot.__mad_tooter;
        }

        this.state = {
            spoilerShown: false,
            toot: toot,
        };
    }

    spoilerToggle = (e) => {
        this.setState({ spoilerShown: !this.state.spoilerShown });
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    toggleTootProperty = prop => response => {
        if (response.status !== 200)
            return;

        this.setState((prevState, props) => {
            let toot = prevState.toot;
            toot[prop] = !toot[prop];

            return { toot: toot };
        });
    };

    favouriteToggle = self => e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (self.state.toot.favourited) {
            AppState.api.unfavourite(self.state.toot.id)
                .then(self.toggleTootProperty("favourited"));
        } else {
            AppState.api.favourite(self.state.toot.id)
                .then(self.toggleTootProperty("favourited"));
        }
    }

    boostToggle = self => e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (self.state.toot.reblogged) {
            AppState.api.unreblog(self.state.toot.id)
                .then(self.toggleTootProperty("reblogged"));
        } else {
            AppState.api.reblog(self.state.toot.id)
                .then(self.toggleTootProperty("reblogged"));
        }
    }

    render() {
        if (!this.state.toot)
            return null;

        const classes = this.props.classes;

        function handleClick () {
            alert("Clicked");
        }

        if (this.state.toot.reblog) {
            return (
                <TootCard toot={this.state.toot.reblog}
                          via={this.state.toot}
                          classes={classes} />
            );
        }

        let spoiler = null;
        if (this.state.toot.spoiler_text) {
            let moreOrLess = "more";
            if (this.state.spoilerShown)
                moreOrLess = "less";

            spoiler = (
                <div>
                  <Typography type="body1"
                              dangerouslySetInnerHTML={{__html: twemoji.parse(this.state.toot.spoiler_text)}} />
                  <Button onClick={this.spoilerToggle} raised>
                    Show {moreOrLess}
                  </Button>
                </div>
            );
        }

        return (
            <Card className={classes.card}>
              <TootCardHeader toot={this.state.toot}
                              via={this.props.via} />

              <CardContent className={classes.content}
                           onClick={handleClick}>
                {spoiler}
                <Collapse in={spoiler == null || this.state.spoilerShown} transitionDuration="auto" unmountOnExit>
                  <Typography type="body1"
                              dangerouslySetInnerHTML={{__html: twemoji.parse(this.state.toot.content)}} />
                </Collapse>
              </CardContent>

              <MediaGallery media={this.state.toot.media_attachments}
                            classes={classes} />

              <CardActions disableActionSpacing>
                <Button dense className={classes.actionButton} disabled>
                  <Icon>reply</Icon>
                </Button>
                <Button dense
                        onClick={this.boostToggle(this)}
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: this.state.toot.reblogged,
                        })}>
                  <Icon>repeat</Icon>
                </Button>
                <Button dense
                        onClick={this.favouriteToggle(this)}
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: this.state.toot.favourited,
                        })}>
                  <Icon>star</Icon>
                </Button>
                <div className={classes.flexGrow} />
                <div className={classes.meta}>
                  <Chip avatar={<Avatar><Icon className={classes.avatarIcon}>person</Icon></Avatar>}
                        label={this.state.toot.__mad_tooter && this.state.toot.__mad_tooter.source}
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
