import React from 'react';
import PropTypes from 'prop-types';
import './Select.scss';

const Select = (props) => {
    const {
        label, options, errors, name, value, onChange, placeholder, readOnly, hideReadOnly,
    } = props;
    const warning = (errors.length > 0);

    if (hideReadOnly && readOnly) {
        return null;
    }

    if (readOnly) {
        const selected = options.find((item) => item.id === value);
        return (
            <>
                <div className="bold-label">{label}</div>
                <div className="read-only-container">
                    <div className="read-only-value">{selected ? selected.name : ''}</div>
                </div>
            </>
        );
    }

    return (
        <>
            {label}
            <div className="input-bordered-container">
                <select name={name} id="" className="select-icafal" defaultValue="0" onChange={onChange}>
                    <option value="0" disabled>{placeholder}</option>
                    {options.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                {warning && <i className="fas fa-exclamation warning" />}
            </div>
        </>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    errors: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.node,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    hideReadOnly: PropTypes.bool,
};

Select.defaultProps = {
    label: '',
    errors: '',
    options: [],
    value: '',
    placeholder: '',
    readOnly: false,
    hideReadOnly: false,
};

export default Select;