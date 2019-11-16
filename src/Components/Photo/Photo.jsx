import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoCapture from './PhotoCapture';
import ImagePreview from './ImagePreview';
import './Photo.scss';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUri: null,
            viewCapture: false,
        };
        this.handleViewCapture = this.handleViewCapture.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleViewCapture() {
        this.setState((prevState) => ({
            viewCapture: !prevState.viewCapture,
        }));
    }

    handleOnChange(dataUri) {
        const { onChange } = this.props;
        onChange(dataUri);
        this.setState({
            dataUri,
            viewCapture: false,
        });
    }

    handleRemove() {
        const { onChange } = this.props;
        onChange(null);
        this.setState({
            dataUri: null,
            viewCapture: false,
        });
    }

    render() {
        const { label } = this.props;
        const { viewCapture, dataUri } = this.state;
        const buttonText = viewCapture ? <i className="far fa-stop-circle" /> : <i className="fas fa-camera" />;
        return (
            <div className="photo-container">
                <div>{label}</div>
                {!dataUri && <button onClick={this.handleViewCapture} type="button">{buttonText}</button>}
                {viewCapture && <PhotoCapture onChange={this.handleOnChange} />}
                {dataUri ? (
                    <>
                        <button onClick={this.handleRemove} type="button">
                            <i className="fas fa-trash" />
                        </button>
                        <ImagePreview dataUri={dataUri} />
                    </>
                ) : null}
            </div>
        );
    }
}

Photo.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Photo.defaultProps = {
    label: '',
};

export default Photo;
