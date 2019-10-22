import React, {Component} from 'react';
import { Container} from 'reactstrap';
import SideBarLeft from './Components/SideBarLeft';
import NavBarTop from './Components/NavBarTop';

export default class MainPrivate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render () {
		return (
			<>
				<Container fluid>
					<div className="mainSideBar">
						<SideBarLeft />
					</div>
					<div className="mainContent mainMiSendero">
						<Container fluid className="m-b">
							<div>
								<NavBarTop nameNavBarTop={this.props.name}/>
							</div>
							<div>
								{this.props.children}
							</div>
						</Container>
					</div>
				</Container>
			</>
		);
	}
}