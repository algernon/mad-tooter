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
import { CardHeader } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import TootAge from './TootAge';
import { showAccount } from '../../../actions/toot';

const styles = theme => ({
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit / 2,
    },
    subHeader: {
        fontSize: "11px",
        lineHeight: "16px",
    },
    title: {
        lineHeight: "16px",
        cursor: 'pointer',
    },

    author: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover .author': {
            textDecoration: 'underline',
        },
        '& .disabled': {
            marginLeft: theme.spacing.unit,
            color: theme.palette.text.disabled,
        },
    },
    via: {
        opacity: '0.5',
    },
});

class Via extends React.Component {
    render() {
        const { classes, via, onClick } = this.props;

        if (!via)
            return null;

        return (
            <span className={classnames(classes.author, classes.via)}>
              &nbsp;via&nbsp;
              <a href={via.account.url}
                 className={classnames(classes.author, classes.via)}
                 onClick={onClick(via.account)}
                 dangerouslySetInnerHTML={{__html:twemoji.parse(via.account.display_name) || via.account.username}} />
              ,&nbsp;
              <TootAge time={via.created_at} href={via.url} />
            </span>
        );
    }
};
Via = withStyles(styles)(Via);

class TootHeader extends React.Component {
    render () {
        const { toot, classes, via } = this.props;

        const avatar = (
            <Avatar component="a"
                    onClick={showAccount(toot.account)}
                    href={toot.account.url}
                    src={toot.account.avatar} />
        );

        const title = (
            <a href={toot.account.url} className={classes.author}
               onClick={showAccount(toot.account)}>
              <span className="author"
                    dangerouslySetInnerHTML={{__html:twemoji.parse(toot.account.display_name) || toot.account.username}} />
              <span className="disabled">{toot.account.acct}</span>
            </a>
        );

        const subheader = (
            <div>
              <TootAge time={toot.created_at} href={toot.url} />
              <Via via={via} onClick={showAccount} />
            </div>
        );

        return (
            <CardHeader
              classes={{subheader: classes.subHeader, title: classes.title}}
              className={classes.header}
              avatar={avatar}
              title={title}
              subheader={subheader} />
        );
    }
}

export default withStyles(styles)(TootHeader);
