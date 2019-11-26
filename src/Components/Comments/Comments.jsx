import React from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

function Comments(props) {
    const { name, onChange } = props;
    return (
        <div className="comments-container">
            <div className="title">Observaciones</div>
            <textarea name={`comment-${name}`} onChange={onChange} />
        </div>
    );
}

Comments.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Comments;
