import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Document, Page, Text, View, StyleSheet, Image,
} from '@react-pdf/renderer';
import logo from './logo.png';

class Doc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: StyleSheet.create({
                page: {
                    // flexDirection: 'row',
                    backgroundColor: '#FFF',
                    paddingLeft: 40,
                    paddingRight: 40,
                },

                columns: {
                    flexDirection: 'row',
                },

                column: {
                    margin: 10,
                    padding: 10,
                    flexGrow: 1,
                    fontSize: 20,
                    fontWeight: 700,
                },

                title: {
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: 'center',
                },

                date: {
                    marginTop: 20,
                    fontSize: 10,
                    textAlign: 'right',
                },

                subtitle: {
                    marginTop: 10,
                    fontSize: 16,
                    fontWeight: 700,
                },

                logo: {
                    width: 100,
                },

                text: {
                    margin: 12,
                    fontSize: 14,
                    textAlign: 'justify',
                },

                item: {
                    fontSize: 14,
                    paddingBottom: 4,
                },

                group: {
                    paddingTop: 20,
                },

                field: {
                    paddingLeft: 20,
                    fontSize: 14,
                },

                fieldContainer: {
                    paddingTop: 10,
                },

                image: {
                    marginTop: 10,
                    marginBottom: 10,
                    width: 250,
                    marginHorizontal: 130,
                },
            }),
        };
    }

    getData(id) {
        const { data } = this.props;
        return data[`field-${id}`] || null;
    }

    getComment(id) {
        const { data } = this.props;
        return data[`comment_field-${id}`] || null;
    }

    getField(field) {
        const { styles } = this.state;
        const data = this.getData(field.id);

        if (!data) return null;

        if (field.type === 'simple' && data) {
            return (
                <Text style={styles.field}>
                    {field.name}
                </Text>
            );
        }

        if (field.type === 'image') {
            return (
                <>
                    <Text style={styles.field}>{field.name}</Text>
                    <Image style={styles.image} src={data} />
                </>
            );
        }

        return (
            <Text style={styles.field}>
                {`${field.name}: ${data}`}
            </Text>
        );
    }

    currentDate = () => {
        const date = new Date();
        const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        let string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}\n`;
        string += `${date.getHours()}:${min}:${sec}`;
        return string;
    }

    render() {
        const {
            form, client, construction, machine, type,
        } = this.props;
        const { styles } = this.state;
        const title = `Informe de ${type === 'checkin' ? 'llegada' : 'salida'} de equipo`;
        const now = this.currentDate();
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.date} fixed>
                        {now}
                    </Text>
                    <Image
                        style={styles.logo}
                        src={logo}
                    />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View style={styles.group}>
                        <Text style={styles.item}>
                            {`Cliente: ${client.name}`}
                        </Text>
                        <Text style={styles.item}>
                            {`Obra: ${construction.name}`}
                        </Text>
                        <Text style={styles.item}>
                            {`Máquina: ${machine.name}`}
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        {form.name}
                    </Text>

                    {form.model_section.map((section) => (
                        <View key={section.id}>
                            <Text style={styles.subtitle}>
                                {section.name}
                            </Text>
                            {section.model_field.map((field) => (
                                <View style={styles.fieldContainer} key={field.id}>
                                    {this.getField(field)}
                                    {field.comments === 1 && this.getComment(field.id) && (
                                        <Text style={styles.field}>
                                            {`Observación: ${this.getComment(field.id)}`}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    ))}
                </Page>
            </Document>
        );
    }
}

Doc.propTypes = {
    client: PropTypes.object.isRequired,
    construction: PropTypes.object.isRequired,
    machine: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default Doc;
