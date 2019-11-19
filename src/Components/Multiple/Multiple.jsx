import React from 'react';
import PropTypes from 'prop-types';
import './Multiple.scss';

function Multiple(props) {
    const {
        label, options, name, errors, required,
    } = props;

    const warning = (errors.length > 0);

    return (
        <div className="multiple-container">
            <div>
                {label}
                {required ? ' *' : ''}
            </div>
            <ul className={`multiple-item ${warning && 'border-error'}`}>
                {options.map((item) => (
                    <li key={item.id}>
                        <input type="radio" id={item.id} value={item.id} name={name} />
                        <label htmlFor={item.id}>{item.name}</label>
                    </li>
                ))}
            </ul>
            {warning && <div className="warning">{errors}</div>}
        </div>
    );
}

Multiple.propTypes = {
    errors: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

Multiple.defaultProps = {
    required: false,
    errors: '',
};

export default Multiple;
