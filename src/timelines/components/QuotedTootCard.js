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
import twemoji from 'twemoji';

import Card, { CardContent } from 'material-ui/Card';
import { DialogContent } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import TootHeader from './card/TootHeader';

const styles = theme => ({
    replyTo: {
        marginTop: 48,
        flex: 'none',
    },
    replyContent: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: 0,
        paddingBottom: 0,
    },
    toot: {
        backgroundColor: theme.palette.background.default,
    },
});

const QuotedTootCard = withStyles(styles)((props) => {
    const { classes, toot } = props;

    if (!toot)
        return null;

    return (
        <DialogContent className={props.className || props.classes.replyTo}>
          <Card className={classes.toot}>
            <TootHeader toot={toot} />

            <CardContent className={classes.replyContent}>
              <Typography type="body2" className="toot"
                          dangerouslySetInnerHTML={{__html: twemoji.parse(toot.spoiler_text)}} />
              <Typography type="body1" className="toot"
                          dangerouslySetInnerHTML={{__html: twemoji.parse(toot.content)}} />
            </CardContent>
          </Card>
        </DialogContent>
    );
});

export default QuotedTootCard;
