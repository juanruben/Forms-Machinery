import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import './PhotoCapture.scss';

class PhotoCapture extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            stoped: false,
        };
        this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
        this.onCameraError = this.onCameraError.bind(this);
    }

    onTakePhotoAnimationDone(dataUri) {
        const { onChange } = this.props;
        onChange(dataUri);
    }

    onCameraError(error) {
        this.setState({
            error,
        });
    }

    onCameraStop() {
        this.setState({
            stoped: true,
        });
    }

    render() {
        const { error, stoped } = this.state;
        return (
            <div className="photo-capture-container">
                <Camera
                    onTakePhotoAnimationDone={this.onTakePhotoAnimationDone}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={false}
                    isImageMirror={false}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                />
                {error && 'error'}
                {stoped && 'stoped'}
            </div>
        );
    }
}

PhotoCapture.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default PhotoCapture;
