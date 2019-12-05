import React, { Component } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StateContext } from '../../State';
import Title from '../../Components/Title/Title';
import { getRegistersDiff } from '../../Service/Api';
import { dateToLocale } from '../../Service/Utils';

import './Compare.scss';

class Compare extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    formatItem = (title, value) => (
        <div>
            <b>{`${title}: `}</b>
            {value}
        </div>
    )

    getFieldCompared = (field) => (
        <Row>
            <Col>
                <b>{field.name}</b>
                {field.type !== 'image' ? field.value : <img className="image-compare" src={field.value} alt="" />}
            </Col>
            <Col>
                <b>{field.name}</b>
                {field.type !== 'image' ? field.value : <img className="image-compare" src={field.value} alt="" />}
            </Col>
        </Row>
    )

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        }
    }

    async loadData() {
        const { match } = this.props;
        const { id } = match.params;
        this.setState({ loading: true });

        await getRegistersDiff(id)
            .then((response) => {
                if (this._isMounted) {
                    console.log(response.data);
                    this.setState({
                        data: response.data,
                    });
                }
            }).catch((error) => {
                this.handleError(error);
            });

        this.setState({ loading: false });
    }

    render() {
        const { history } = this.props;
        const { data, loading } = this.state;
        const { current, previous } = data;

        return (
            <>
                <button onClick={() => { history.goBack(); }} className="back-button" type="button">
                    <i className="fas fa-long-arrow-alt-left" />
                    {' '}
                    Volver
                </button>
                <Title text="Comparación - EN DESARROLLO -" />

                {loading && (
                    <div className="simple-loading-container">
                        <Spinner />
                    </div>
                )}

                {current && (
                    <Row>
                        <Col className="compare-column">
                            {this.formatItem('Cliente', current.client.name)}
                            {this.formatItem('Razón social', current.client.business_name)}
                            {this.formatItem('Obra', current.construction.name)}
                            {this.formatItem('Dirección', current.construction.address)}
                            {this.formatItem('Máquina', current.machine.name)}
                            {this.formatItem('Código:', current.machine.code)}
                            {this.formatItem('Modelo:', current.machine.model)}
                            {this.formatItem('Formulario:', current.form.value)}
                        </Col>
                    </Row>
                )}

                {!loading && (
                    <Row>
                        <Col className="compare-column">
                            <Title text="Salida" />
                            {previous ? (
                                <>
                                    <div className="document-pdf-icon">
                                        <a href={previous.pdf} target="_blank" rel="noopener noreferrer">
                                            <i className="far fa-file-pdf" />
                                        </a>
                                    </div>
                                    {this.formatItem('Fecha', dateToLocale(previous.created_at))}
                                    {this.formatItem('Usuario', `${current.user.name} ${current.user.last_name}`)}
                                </>
                            ) : (<div>No hay registro anterior</div>)}
                        </Col>
                        <Col className="compare-column left-compare">
                            {current && (
                                <>
                                    <Title text="Entrada" />
                                    <div className="document-pdf-icon">
                                        <a href={current.pdf} target="_blank" rel="noopener noreferrer">
                                            <i className="far fa-file-pdf" />
                                        </a>
                                    </div>
                                    {this.formatItem('Fecha', dateToLocale(current.created_at))}
                                    {this.formatItem('Usuario', `${current.user.name} ${current.user.last_name}`)}
                                </>
                            )}
                        </Col>
                    </Row>
                )}

                {!loading && current && current.form.section.map((section) => (
                    <div key={section.id}>
                        <div className="section-compare"><b>{section.value}</b></div>
                        {section.fields.map((field) => (
                            <div key={field.id}>
                                {this.getFieldCompared(field)}
                            </div>
                        ))}
                    </div>
                ))}

            </>
        );
    }
}

Compare.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

Compare.contextType = StateContext;

export default withRouter(Compare);
