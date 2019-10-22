import React from 'react';
import { Row, Col} from 'reactstrap';
import { Link } from "react-router-dom"

export default class NavBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="NavBarTop">
        <Row>
          <Col xs={6} md={6} className="text-left">
            <p className="navBarTextTitle">{this.props.nameNavBarTop}</p>
          </Col>
          <Col xs={6} md={6} className="text-right">
            <Link to="/" className="volver">Volver</Link>
          </Col>
        </Row>
      </div>
    );
  }
}