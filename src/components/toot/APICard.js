// @flow weak

import React from 'react';
import axios from 'axios';

import TootCard from './Card';

class TootAPICard extends React.Component {
    state = {
        toot: null,
    };

    componentDidMount () {
        axios.get(this.props.url)
            .then((response) => {
                this.setState({toot: response.data});
            });
    }

    render () {
        return (
            <TootCard toot={this.state.toot} />
        );
    }
}

export default TootAPICard;
