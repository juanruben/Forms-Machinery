import React from 'react';
import PropTypes from 'prop-types';
import './Title.scss';

function Title(props) {
    const { text } = props;
    return (
        <div className="title-container">
            {text}
        </div>
    );
}

Title.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Title;
