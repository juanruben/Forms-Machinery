import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

function Avatar(props) {
    const { image, title } = props;
    return (
        <div className="avatar-container">
            <img src={image} alt="avatar" />
            {title && (
                <div className="title">
                    {`Usuario ${title}`}
                </div>
            )}
        </div>
    );
}

Avatar.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
};

Avatar.defaultProps = {
    title: null,
};

export default Avatar;
