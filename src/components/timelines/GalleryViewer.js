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
import { connect } from 'react-redux';

import Lightbox from 'react-image-lightbox';

import store from '../../store';

class GalleryViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photoIndex: props.startIndex };
    }

    handleCloseRequest () {
        store.dispatch({type: 'GALLERY_HIDE'})
    }

    handleMovePrevRequest = self => () => {
        self.setState({
            photoIndex: (self.state.photoIndex + self.props.images.length - 1) % self.props.images.length,
        });
    }

    handleMoveNextRequest = self => () => {
        self.setState({
            photoIndex: (self.state.photoIndex + 1) % self.props.images.length,
        });
    }

    render() {
        const { show, images } = this.props;
        const { photoIndex } = this.state;

        if (!images || !show)
            return null;

        const media = images.map(medium => {
            return medium.url;
        });

        const nextSrc = media.length === 1 ? null : media[(photoIndex + 1) % media.length];
        const prevSrc = media.length === 1 ? null : media[(photoIndex + media.length - 1) % media.length];

        return (
            <Lightbox reactModalStyle={{overlay: {zIndex: 2000}}}
                      mainSrc={media[photoIndex]}
                      nextSrc={nextSrc}
                      prevSrc={prevSrc}
                      onCloseRequest={this.handleCloseRequest}
                      onMovePrevRequest={this.handleMovePrevRequest(this)}
                      onMoveNextRequest={this.handleMoveNextRequest(this)} />
        );
    }
}

const stateToProps = ({ gallery }) => ({
    show: gallery.show,
    images: gallery.images,
    startIndex: gallery.startIndex,
});

export default connect(stateToProps)(GalleryViewer);
