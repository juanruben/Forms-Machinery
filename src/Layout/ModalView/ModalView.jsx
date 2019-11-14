import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import {
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import './ModalView.scss';

class ModalView extends Component {
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
        const { title, children, type } = this.props;

        let button;
        switch (type) {
            case 'add':
                button = (
                    <span className="modal-add-button">
                        <button onClick={this.toggle} type="button">
                            <i className="fas fa-plus-circle" />
                        </button>
                    </span>
                );
                break;
            case 'edit':
                button = (
                    <span className="form-actions__icon" onClick={this.toggle}>
                        <i className="fas fa-pen" />
                    </span>
                );
                break;
            default:
                button = (
                    <button style={{ border: 'none', backgroundColor: 'rgba(0,0,0,0.0)', color: 'rgb(190,51,1)', outline: '0' }} onClick={this.toggle} type="button">
                        {title}
                    </button>
                );
                break;
        }
        return (
            <>
                {button}
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

ModalView.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ModalView;
