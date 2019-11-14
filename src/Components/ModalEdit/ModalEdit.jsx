import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import {
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';

class ModalEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showing: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState) => ({
            showing: !prevState.showing,
        }));
    }

    render() {
        const { showing } = this.state;
        const { title, children } = this.props;
        return (
            <>
                <span className="form-actions__icon" onClick={this.toggle}><i className="fas fa-pen" /></span>
                <Modal isOpen={showing} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        {cloneElement(children, { callback: this.toggle })}
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

ModalEdit.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ModalEdit;
