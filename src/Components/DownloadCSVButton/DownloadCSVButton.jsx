import React from 'react';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import './DownloadCSVButton.scss';

function DownloadCSVButton(props) {
    const { data, filename } = props;
    return (
        <CSVLink data={data} filename={filename} separator=";" className="icon-button">
            <i className="fas fa-file-download" />
        </CSVLink>
    );
}

DownloadCSVButton.propTypes = {
    data: PropTypes.array.isRequired,
    filename: PropTypes.string.isRequired,
};

export default DownloadCSVButton;
