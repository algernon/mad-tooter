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

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { showMediaInGallery } from '../../../actions/gallery';

const styles = theme => ({
    image: {
        cursor: 'zoom-in',
        padding: theme.spacing.unit / 2,
        margin: theme.spacing.unit / 2,
        height: 'fit-content',
    },
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit,
        justifyContent: 'center',
    },
});

const GalleryItem = withStyles(styles)((props) => {
    const maxWidth = 300;

    let width = null;
    let height = null;

    if (props.image.meta) {
        width = props.image.meta.small.width;
        height =  props.image.meta.small.height;

        if (width > maxWidth) {
            height = Math.round((maxWidth / width) * height);
            width = maxWidth;
        }
    }

    return (
        <Paper square className={props.classes.image}>
          <img alt=""
               onClick={props.onClick}
               width={width} height={height}
               src={props.image.preview_url} />
        </Paper>
    );
});

const Gallery = withStyles(styles)((props) => {
    if (!props.media || !props.media.length)
        return null;

    return (
            <div className={props.classes.gallery}>
              {props.media.map((medium, idx) => (
                  <GalleryItem image={medium}
                               onClick={showMediaInGallery(idx, props.media)}
                               key={`media-${medium.id}`} />))}
            </div>
    );

});

export default Gallery;
