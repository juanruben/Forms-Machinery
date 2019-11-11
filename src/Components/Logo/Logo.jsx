import React from 'react';
import PropTypes from 'prop-types';
import image from '../../Assets/images/logo.png';

const Logo = (props) => {
    const { padding, maxWidth } = props;
    const divStyle = {
        padding,
        textAlign: 'center',
    };
    const imgStyle = {
        maxWidth,
    };
    return (
        <div style={divStyle}>
            <img style={imgStyle} src={image} alt="logo icafal" />
        </div>
    );
};

Logo.propTypes = {
    padding: PropTypes.number,
    maxWidth: PropTypes.number,
};

Logo.defaultProps = {
    padding: 0,
    maxWidth: 80,
};

export default Logo;
