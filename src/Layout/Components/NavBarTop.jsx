import React from 'react';
import { Row, Col } from 'reactstrap';

class NavBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { nameNavBarTop } = this.props;
    return (
      <div className="NavBarTop">
        <Row>
          <Col xs={12} md={12} className="text-left">
            <p className="navBarTextTitle">{nameNavBarTop}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavBarTop;
