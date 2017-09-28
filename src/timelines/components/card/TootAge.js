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
import moment from 'moment';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    tootAge: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        'a&:hover': {
            textDecoration: 'underline',
        },
    }
});

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

export default withStyles(styles)(TootAge);
