import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
    const {
        label, icon, errors, type, name, value, onChange, placeholder, locked, hideLocked,
    } = props;
    const warning = (errors.length > 0);

    if (hideLocked && locked) {
        return null;
    }

    return (
        <div className="input-bordered-container">
            <div className={locked ? 'bold-label' : ''}>{label}</div>
            {icon && <i className={icon} />}
            {locked ? (
                <div className="input-bordered-container__locked-value">{value}</div>
            ) : (
                    <input className={`input-bordered ${warning && 'border-error'} ${icon && 'padding-icon'}`} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
                )}
            {warning && <i className="fas fa-exclamation warning" />}
        </div>
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
    locked: PropTypes.bool,
    hideLocked: PropTypes.bool,
};

Input.defaultProps = {
    label: '',
    icon: null,
    errors: '',
    type: 'text',
    value: '',
    placeholder: '',
    locked: false,
    hideLocked: false,
};

export default Input;
