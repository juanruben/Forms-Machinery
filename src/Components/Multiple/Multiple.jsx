import React from 'react';
import PropTypes from 'prop-types';
import './Multiple.scss';

function Multiple(props) {
    const { label, options, name } = props;
    return (
        <div className="multiple-container">
            <div>{label}</div>
            <ul className="multiple-item">
                {options.map((item) => (
                    <li key={item.id}>
                        <input type="radio" id={item.id} value={item.id} name={name} />
                        <label htmlFor={item.id}>{item.name}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Multiple.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default Multiple;
