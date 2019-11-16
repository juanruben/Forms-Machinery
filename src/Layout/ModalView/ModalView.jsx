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
                    <button className="modal-add-button" onClick={this.toggle} type="button">
                        <i className="fas fa-plus-circle" />
                    </button>
                );
                break;
            case 'edit':
                button = (
                    <button className="modal-edit-button" onClick={this.toggle} type="button">
                        <i className="fas fa-pen" />
                    </button>
                );
                break;
            default:
                button = (
                    <button className="modal-link-button" onClick={this.toggle} type="button">
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
    type: PropTypes.string,
};

ModalView.defaultProps = {
    type: '',
};

export default ModalView;
