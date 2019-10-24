import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

export default class MenuOperador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    event.preventDefault();
    this.setState((state) => ({ collapse: !state.collapse }));
  }

  render() {
    const path = '/operador/';
    return (
      <>
        <Link onClick={this.toggle}>
          <li className="li-link">
            <span className="sidebar-label">
              Entradas y Salidas
            </span>
            <Collapse isOpen={this.state.collapse}>
              <Link to={`${path}check-in`}>
                <li className="li-link">
                  <span className="sidebar-label">
                    Check In
                  </span>
                </li>
              </Link>
              <Link to={`${path}check-out`}>
                <li className="li-link">
                  <span className="sidebar-label">
                    Check Out
                  </span>
                </li>
              </Link>
            </Collapse>
          </li>
        </Link>
      </>
    );
  }
}
