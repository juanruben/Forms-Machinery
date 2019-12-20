import React from 'react';
import PropTypes from 'prop-types';
import './ItemOption.scss';

const ItemOption = (props) => {
    const { text, onClick, value } = props;
    return (
        <div className="item-option">
            <span>{text}</span>
            <button value={value} onClick={onClick} type="button">
                <i className="fas fa-trash" />
            </button>
        </div>
    );
};

ItemOption.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

ItemOption.defaultProps = {
    text: 'ItemOption',
};

export default ItemOption;
