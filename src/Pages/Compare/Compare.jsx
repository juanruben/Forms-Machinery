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
            current: null,
            previous: null,
            machine: null,
            form: null,
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
        <Row className={this.diff(field) ? 'compare-item compare-diff' : 'compare-item'}>
            <Col>
                <b>{`${field.name}: `}</b>
                {field.type !== 'image' ? field.value_previous : <img className="image-compare" src={field.value_previous} alt="" />}
                {field.comments_previous && (
                    <div className="compare-item-comment">
                        <i>{`Observaciones: ${field.comments_previous}`}</i>
                    </div>
                )}
            </Col>
            <Col>
                <b>{`${field.name}: `}</b>
                {field.type !== 'image' ? field.value_current : <img className="image-compare" src={field.value_current} alt="" />}
                {field.comments_current && (
                    <div className="compare-item-comment">
                        <i>{`Observaciones: ${field.comments_current}`}</i>
                    </div>
                )}
            </Col>
        </Row>
    )

    diff = (field) => {
        if (field.type === 'simple' || field.type === 'multiple') {
            return field.value_previous !== field.value_current;
        }
        return false;
    }

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        }
    }

    getHeader = (title, info) => (
        <div className="compare-title-container">
            <Title text={title} />
            <div className="compare-title-info">
                {this.formatItem('Fecha', dateToLocale(info.created_at))}
                {this.formatItem('Usuario', `${info.user.name} ${info.user.last_name}`)}
                <Row>
                    <Col className="compare-column">
                        {this.formatItem('Cliente', info.client.name)}
                        {this.formatItem('Razón social', info.client.business_name)}
                        {this.formatItem('Obra', info.construction.name)}
                        {this.formatItem('Dirección', info.construction.address)}
                    </Col>
                </Row>
            </div>
            <div className="document-pdf-icon">
                <a href={info.pdf} target="_blank" rel="noopener noreferrer">
                    <i className="far fa-file-pdf" />
                </a>
            </div>
        </div>
    );

    async loadData() {
        const { match } = this.props;
        const { id } = match.params;
        this.setState({ loading: true });

        await getRegistersDiff(id)
            .then((response) => {
                if (this._isMounted) {
                    this.setState({
                        current: response.data.current,
                        previous: response.data.previous,
                        machine: response.data.machine,
                        form: response.data.form,
                    });
                }
            }).catch((error) => {
                this.handleError(error);
            });

        this.setState({ loading: false });
    }

    render() {
        const { history } = this.props;
        const {
            current, previous, machine, form, loading,
        } = this.state;

        return (
            <>
                <button onClick={() => { history.goBack(); }} className="back-button" type="button">
                    <i className="fas fa-long-arrow-alt-left" />
                    {' '}
                    Volver
                </button>
                <Title text="Comparación" />

                {loading && (
                    <div className="simple-loading-container">
                        <Spinner />
                    </div>
                )}

                {current && machine && form && (
                    <>
                        <Row>
                            <Col className="compare-column">
                                {this.formatItem('Máquina', machine.name)}
                                {this.formatItem('Código', machine.code)}
                                {this.formatItem('Marca', machine.brand)}
                                {this.formatItem('Modelo', machine.model)}
                                {this.formatItem('Patente', machine.plate)}
                                {this.formatItem('Número de serie', machine.serie)}
                            </Col>
                        </Row>
                    </>
                )}

                {!loading && (
                    <Row>
                        <Col className="compare-column">
                            {previous && (this.getHeader('Salida', previous))}
                        </Col>
                        <Col className="compare-column">
                            {current && (this.getHeader('Entrada', current))}
                        </Col>
                    </Row>
                )}

                {form && form.section.map((section) => (
                    <div key={section.id}>
                        <div className="section-compare"><b>{section.name}</b></div>
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
