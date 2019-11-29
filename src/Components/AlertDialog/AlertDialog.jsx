import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

function AlertDialog(props) {
    const {
        message, show, onConfirm, title,
    } = props;
    return (
        <SweetAlert
            title={title}
            show={show}
            error
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
};

AlertDialog.defaultProps = {
    title: '',
    message: '',
};

export default AlertDialog;
