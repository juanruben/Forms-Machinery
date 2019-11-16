import React from 'react';
import PropTypes from 'prop-types';

import './ImagePreview.scss';

function ImagePreview({ dataUri }) {
    return (
        <div className="image-preview-container">
            <img src={dataUri} alt="preview" />
        </div>
    );
}

ImagePreview.propTypes = {
    dataUri: PropTypes.string.isRequired,
};

export default ImagePreview;
