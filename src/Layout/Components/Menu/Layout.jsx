import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e, tab) {
    const { collapse } = this.state;
    e.preventDefault();
    if (collapse !== tab) {
      this.setState({
        collapse: tab,
      });
    } else {
      this.setState({
        collapse: 0,
      });
    }
  }

  render() {
    const { items, path } = this.props;
    const { collapse } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {items.map((item, index) => (
          <Link to={path + item.link} onClick={(e) => { this.toggle(e, index + 1); }} key={index}>
            <li className="li-link">
              <span className="sidebar-label">
                {item.name}
              </span>
              <ul>
                {typeof item.submenu !== 'undefined' ? (
                  <Collapse isOpen={collapse === (index + 1)}>
                    {item.submenu.map((item2, index2) => (
                      <Link to={path + item2.link} key={index2}>
                        <li className="li-sub-link">
                          <span className="sidebar-label">
                            {item2.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </Collapse>
                ) : null}
              </ul>
            </li>
          </Link>
        ))}
      </>
    );
  }
}
