import React, { Component } from 'react';
import { getClients, getMachines, getConstructionsByClient, getForm } from "../../Service/Api";
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import Simple from '../../Components/Simple/Simple';
import Multiple from '../../Components/Multiple/Multiple';
import Input from '../../Components/Input/Input';
import Photo from '../../Components/Photo/Photo';

import './CheckIn.scss';

class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            clients: [],
            constructions: [],
            machines: [],
            form: {
                model_section: [
                    {
                        model_field: []
                    }
                ]
            },
            errors: {},
            client: {
                id: 0
            },
            machine: {
                id: 0
            },
            construction: {}
        };
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeMachine = this.onChangeMachine.bind(this);
    }

    componentDidMount() {
        this.loadClients();
        this.loadMachines();
    }

    //Loaders

    async loadClients() {

        await getClients().then((response) => {

            let { clients } = this.state;
            clients = response.data;
            this.setState({
                clients,
            })
        })

    }

    async loadMachines() {

        await getMachines().then((response) => {

            let { machines } = this.state;

            machines = response.data;

            this.setState({
                machines,
            })
        })

    }

    async loadConstructionsByClientId(id) {
        await getConstructionsByClient(id)
            .then((response) => {
                console.log(response)
                let { constructions } = this.state;
                constructions = response.data.construction;
                this.setState({
                    constructions,
                });
            })
    }


    //On Changes Events

    onChangeClient(event) {
        const { value } = event.target;
        const { clients } = this.state;

        let client = clients.find((item) => {
            return item.id === parseInt(value)
        });

        this.loadConstructionsByClientId(client.id);

        this.setState({
            client,
        });
    }

    async onChangeMachine(event) {

        const { value } = event.target;
        const { machines } = this.state;

        let machine = machines.find((item) => {
            return item.id === parseInt(value)
        });

        await getForm(machine.model_form_id).then((response) => {

            this.setState({
                form: response.data
            })
        })

        this.setState({
            machine,
        });
    }

    render() {
        const { errors, clients, machines, constructions, client, machine, form } = this.state;

        // TODO. Pasar todo array de errors

        return (

            <div className="check-in-container">
                <Title text="Datos generales" />

                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select required label="Cliente" options={clients} placeholder="Seleccione..." name="client" onChange={this.onChangeClient} value={client.id.toString()} errors={errors} /></Col>
                        <Col md={6}><Select label="Obra" options={constructions} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
                        <Col md={12}><Select label="Código de máquina" options={machines} placeholder="Seleccione..." name="machine" value={machine.id.toString()} onChange={this.onChangeMachine} /></Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Title text={form.name ? form.name : ""} />
                        </Col>
                    </Row>
                        {form.model_section.map((section) => {
                            return (
                                <>                                    
                                    <Row key={"section" + section.id}>
                                    
                                        <Col md={12} style={{marginLeft: "20px"}}>
                                            <Title text={section.name ? section.name : ""} />
                                        </Col> 
                                        
                                        {section.model_field.map( (field) => {
                                            return (                                            
                                                (field.type === 'multiple' ? 
                                                    <Col md={6} key={"field" + field.id} style={{padding: "5px 30px"}}><Multiple required label={field.name} options={field.options} name={field.name} onChange={() => { }} errors={errors} /></Col>
                                                    : field.type === 'image' ? 
                                                        <Col md={6} key={"field" + field.id} style={{padding: "5px 30px"}}><Photo label={field.name} name="name3" onChange={() => { }} /></Col>
                                                        : field.type === 'simple' ?
                                                        <Col md={6} key={"field" + field.id} style={{padding: "5px 30px"}}><Simple label={field.name} name="name" onChange={() => { }} /></Col> 
                                                            : <Col md={6} key={"field" + field.id} style={{padding: "5px 30px"}}><Input label={field.name} name="name" placeholder="Nombre" onChange={() => { }} /></Col>
                                                )
                                            )
                                        })}                               

                                    </Row>
                                </>
                            )                           
                            
                        })}

                    {/* <Row>
                        <Col md={6}><Simple label="Esto es un ejemplo de selección simple" name="name" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple required label="Esto es un ejemplo de múltiples opciones" options={options} name="test" onChange={() => { }} errors={errors} /></Col>
                        <Col md={6}><Multiple label="Otro ejemplo de múltiples opciones" options={options2} name="name2" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple label="Y otro más" options={options3} name="name3" onChange={() => { }} /></Col>
                        <Col md={4}><Photo required label="Toma una foto de XYZ en la máquina" onChange={() => { }} name="photo1" errors={errors} /></Col>
                        <Col md={4}><Photo label="Toma otra foto de la máquina" name="name2" onChange={() => { }} /></Col>
                        <Col md={4}><Photo label="Y otra foto más" name="name3" onChange={() => { }} /></Col>
                    </Row> */}
                </div>
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Enviar" onClick={() => { }} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckIn;
