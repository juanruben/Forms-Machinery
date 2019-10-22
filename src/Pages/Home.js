import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';

import Layout from '../Layout';

class Home extends Component {
	render() {
		return (
            <>
                <Layout name="Texto ">
                    <Container>
                        <Row>
                            <Col>
                                Esto es el Home
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
	}
}

export default Home;