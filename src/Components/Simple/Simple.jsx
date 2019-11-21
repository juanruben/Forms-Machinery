import React from 'react';
import PropTypes from 'prop-types';
import './Simple.scss';

function Simple(props) {
    const { label, name, onChange } = props;
    return (
        <div className="simple-container">
            <div>{label}</div>
            <label className="switch" htmlFor={name}>
                <input id={name} name={name} type="checkbox" onChange={onChange}/>                 
                <span className="slider round" />                
            </label>
        </div>
    );
}

Simple.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Simple;
