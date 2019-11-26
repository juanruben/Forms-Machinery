import React from 'react';
import PropTypes from 'prop-types';
import './Multiple.scss';

function Multiple(props) {
    const {
        label, options, name, errors, required, onChange,
    } = props;

    const warning = (errors[name] && errors[name].length > 0);

    return (
        <div className="multiple-container">
            <div>
                {label}
                {required ? ' *' : ''}
            </div>
            <ul className={`multiple-item ${warning && 'border-error'}`}>
                {options.map((item) => (
                    <li key={item.id}>
                        <input type="radio" id={item.id} value={item.id} name={name} onChange={onChange} />
                        <label htmlFor={item.id}>{item.name}</label>
                    </li>
                ))}
            </ul>
            {warning && <div className="warning">{errors[name]}</div>}
        </div>
    );
}

Multiple.propTypes = {
    errors: PropTypes.object,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

Multiple.defaultProps = {
    required: false,
    errors: {},
};

export default Multiple;
