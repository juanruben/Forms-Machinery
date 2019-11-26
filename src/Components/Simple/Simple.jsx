import React from 'react';
import PropTypes from 'prop-types';
import './Simple.scss';

function Simple(props) {
    const {
        label, name, onChange, value, required,
    } = props;
    return (
        <div className="simple-container">
            <div>
                {label}
                {required ? ' *' : ''}
            </div>
            <label className="switch" htmlFor={name}>
                <input id={name} name={name} type="checkbox" onChange={onChange} checked={value} />
                <span className="slider round" />
            </label>
        </div>
    );
}

Simple.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
};

Simple.defaultProps = {
    value: false,
    required: false,
};

export default Simple;
