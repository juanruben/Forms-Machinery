import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SideBarLeft from './Components/SideBarLeft';
import NavBarTop from './Components/NavBarTop';

class MainPrivate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { name, children } = this.props;
        return (
            <Container fluid>
                <div className="mainSideBar">
                    <SideBarLeft />
                </div>
                <div className="mainContent main-icafal">
                    <Container fluid className="m-b">
                        <div>
                            <NavBarTop nameNavBarTop={name} />
                        </div>
                        <div className="container-data">
                            {children}
                        </div>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default MainPrivate;
