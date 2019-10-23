import React from 'react';
import { Row, Col} from 'reactstrap';

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
          <Col xs={12} md={12} className="text-left">
            <p className="navBarTextTitle">{this.props.nameNavBarTop}</p>
          </Col>
        </Row>
      </div>
    );
  }
}