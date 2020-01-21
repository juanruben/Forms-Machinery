import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';

function ConstructionClientView(props) {
    const { client, construction } = props;

    const rest = {
        onChange: null,
        errors: [],
        required: true,
        readOnly: true,
    };

    return (
        <>
            <Row className="padding10">
                <Col md={12}><Input name="name" label="Nombre" value={construction.name} icon="fas fa-industry" {...rest} /></Col>
                <Col md={12}><Input name="address" label="Dirección" value={construction.address} icon="fas fa-map-marked-alt" {...rest} /></Col>
                <Col md={12}><Input name="notifications" label="Emails" value={construction.notifications} icon="far fa-envelope" {...rest} /></Col>
            </Row>
            <Title text="Cliente" />
            <Row className="padding10">
                <Col md={6}><Input name="name" label="Nombre empresa" value={client.name} icon="fas fa-industry" {...rest} /></Col>
                <Col md={6}><Input name="business_name" label="Razón social" value={client.business_name} {...rest} /></Col>
                <Col md={6}><Input name="rut" label="Rut empresa" value={client.rut} icon="far fa-address-card" {...rest} /></Col>
                <Col md={6}><Input name="contact" label="Teléfono de contacto" value={client.contact} icon="fas fa-phone" {...rest} /></Col>
                <Col md={12}><Input name="address" label="Dirección" value={client.address} icon="fas fa-map-marked-alt" {...rest} /></Col>
                <Col md={12}><Input name="email" label="Email" value={client.email} icon="far fa-envelope" {...rest} /></Col>
            </Row>
        </>
    );
}

ConstructionClientView.propTypes = {
    construction: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
};

export default ConstructionClientView;
