import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';

import Layout from '../../../Layout';

class Home extends Component {
	render() {
		return (
            <>
                <Layout name="Esto es el topheader">
                    <Container>
                        <Row>
                            <Col>
                                Esto es el Home del operador
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
	}
}

export default Home;