import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

export function AlertDialog(props) {
    const {
        message, show, onConfirm, title, success,
    } = props;
    return (
        <SweetAlert
            title={title}
            show={show}
            error={!success}
            onConfirm={onConfirm}
        >
            {message}
        </SweetAlert>
    );
}

AlertDialog.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    success: PropTypes.bool,
};

AlertDialog.defaultProps = {
    title: '',
    message: '',
    success: false,
};

export function ConfirmDialog(props) {
    const {
        show, onConfirm, onCancel, title,
    } = props;
    return (
        <SweetAlert
            show={show}
            warning
            showCancel
            confirmBtnText="Sí, estoy seguro"
            cancelBtnText="No, Cancelar"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
        >
            ¿Está seguro?
        </SweetAlert>
    );
}

ConfirmDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
};

ConfirmDialog.defaultProps = {
    title: '',
};
