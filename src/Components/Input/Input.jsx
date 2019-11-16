import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
    const {
        label, icon, errors, type, name, value, onChange, placeholder, readOnly, hideReadOnly,
    } = props;
    const warning = (errors.length > 0);

    if (hideReadOnly && readOnly) {
        return null;
    }

    if (readOnly) {
        return (
            <div className="read-only-container">
                <div className="label">{label}</div>
                <div className="content">
                    {icon && <i className={icon} />}
                    <div className={`read-only-value ${icon && 'padding-icon'}`}>{value}</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {label}
            <div className="input-container">
                {icon && <i className={icon} />}
                <input
                    className={`${warning && 'border-error'} ${icon && 'padding-icon'}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {warning && <i className="fas fa-exclamation warning" />}
            </div>
        </>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.node,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    hideReadOnly: PropTypes.bool,
};

Input.defaultProps = {
    label: '',
    icon: null,
    errors: '',
    type: 'text',
    value: '',
    placeholder: '',
    readOnly: false,
    hideReadOnly: false,
};

export default Input;
