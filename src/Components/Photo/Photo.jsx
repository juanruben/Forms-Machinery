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
        const {
            label, required, name, errors,
        } = this.props;
        const { viewCapture, dataUri } = this.state;
        const warning = (errors[name] && errors[name].length > 0);
        const buttonText = viewCapture ? <i className="far fa-stop-circle" /> : <i className="fas fa-camera" />;

        return (
            <div className="photo-container">
                <div>
                    {label}
                    {required ? ' *' : ''}
                </div>
                <div className={`${warning && 'border-error'}`}>
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
                {warning && <div className="warning">{errors[name]}</div>}
            </div>
        );
    }
}

Photo.propTypes = {
    errors: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

Photo.defaultProps = {
    errors: {},
    label: '',
    required: false,
};

export default Photo;
