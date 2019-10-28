import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import verpdf from '../../../Assets/images/ad10.png';

class RegistroHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  render() {
    const { modal } = this.state;
    return (
      <>
        <img src={verpdf} alt="" onClick={this.toggle} />
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <h3 className="text-center">Informe de despacho de equipos</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-orange" onClick={this.toggle}>Descargar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default RegistroHistorico;
