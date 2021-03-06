import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

import './Select.scss';

const Select = (props) => {
    const {
        label, options, errors, name, value, onChange, placeholder,
        readOnly, hideReadOnly, required, loading,
    } = props;
    const warning = (errors[name] && errors[name].length > 0);

    if (hideReadOnly && readOnly) {
        return null;
    }

    if (readOnly) {
        const selected = options.find((item) => item.id === value);
        return (
            <div className="read-only-container">
                <div className="label">{label}</div>
                <div className="read-only-value">{selected ? selected.name : ''}</div>
            </div>
        );
    }

    return (
        <>
            <div className="select-container">
                {label}
                {required ? ' *' : ''}
                {loading && <div className="loading"><Spinner size="sm" /></div>}
                <select className={`${warning && 'border-error'}`} name={name} id="" value={value} onChange={onChange} disabled={loading}>
                    <option value="-1" disabled>{placeholder}</option>
                    {options.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                {warning && <div className="warning">{errors[name]}</div>}
            </div>
        </>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    errors: PropTypes.object,
    options: PropTypes.array,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    hideReadOnly: PropTypes.bool,
    required: PropTypes.bool,
    loading: PropTypes.bool,
};

Select.defaultProps = {
    label: '',
    errors: {},
    options: [],
    value: '-1',
    placeholder: '',
    readOnly: false,
    hideReadOnly: false,
    required: false,
    loading: false,
};

export default Select;
