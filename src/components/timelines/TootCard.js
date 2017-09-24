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

import classnames from 'classnames';
import React from 'react';
import twemoji from 'twemoji';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import PersonIcon from 'material-ui-icons/Person';
import RepeatIcon from 'material-ui-icons/Repeat';
import ReplyIcon from 'material-ui-icons/Reply';
import StarIcon from 'material-ui-icons/Star';

import Gallery from './card/Gallery';
import TootHeader from './card/TootHeader';
import { updateToot, replyToToot, showContext } from '../../actions/toot';

const styles = theme => ({
    toot: {
        width: "100%",
    },
    flex: {
        flex: '1 1 auto',
    },
    meta: {
        display: 'flex',
        paddingRight: theme.spacing.unit * 2,
    },
    content: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: 0,
        paddingBottom: 0,
        cursor: 'pointer',
    },
});

const SpoilerText = (props) => {
    const { spoiler_text, show, onClick } = props;

    if (!spoiler_text)
        return null;

    return (
        <div>
          <Typography type="body1"
                      dangerouslySetInnerHTML={{__html: twemoji.parse(spoiler_text)}} />
          <Button onClick={onClick} raised>
            Show {show ? "less" : "more"}
          </Button>
        </div>
    );
}

class TootCard extends React.Component {
    constructor(props) {
        super(props);

        let toot = props.toot;
        if (toot.reblog) {
            toot.reblog.__mad_tooter = toot.__mad_tooter;
        }

        this.state = {
            toot: toot,
            spoilerShown: !!!toot.spoiler_text,
        };
    }

    spoilerToggle = (e) => {
        this.setState({ spoilerShown: !this.state.spoilerShown });
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    render () {
        const { classes, toot, via, action } = this.props;

        if (!toot)
            return null;

        if (toot.reblog) {
            return (
                <TootCard toot={toot.reblog}
                          via={toot}
                          classes={classes}
                          action={action} />
            );
        }

        return (
            <Card className={classes.toot}>
              <TootHeader toot={toot}
                          via={via}
                          action={action} />

              <CardContent className={classes.content}>
                <SpoilerText spoiler_text={toot.spoiler_text}
                             show={this.state.spoilerShown}
                             onClick={this.spoilerToggle} />
                <Collapse in={this.state.spoilerShown} transitionDuration="auto" unmountOnExit>
                  <Gallery media={toot.media_attachments} />
                  <Typography type="body1" className="toot"
                              onClick={showContext(toot)}
                              dangerouslySetInnerHTML={{__html: twemoji.parse(toot.content)}} />
                </Collapse>
              </CardContent>

              <CardActions disableActionSpacing>
                <Button dense className={classes.actionButton}
                        onClick={replyToToot(toot)} >
                  <ReplyIcon />
                </Button>
                <Button dense
                        onClick={updateToot(toot.id, "reblogged", (oldState) => { return !oldState; })}
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: toot.reblogged,
                        })}>
                  <RepeatIcon />
                </Button>
                <Button dense
                        onClick={updateToot(toot.id, "favourited", (oldState) => { return !oldState; })}
                        className={classnames(classes.actionButton, {
                            [classes.onButton]: toot.favourited,
                        })}>
                  <StarIcon />
                </Button>
                <div className={classes.flex} />
                <div className={classes.meta}>
                  <Chip avatar={<Avatar><PersonIcon /></Avatar>}
                        label={this.state.toot.__mad_tooter && this.state.toot.__mad_tooter.source}
                        className={classes.chip} />
                </div>
              </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(TootCard);
