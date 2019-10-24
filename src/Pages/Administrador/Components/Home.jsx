import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Layout from '../../../Layout/MainPrivate';

const Home = () => (
  <Layout name="Esto es el topheader">
    <Container>
      <Row>
        <Col>
          Esto es el Home del administrador
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default Home;
