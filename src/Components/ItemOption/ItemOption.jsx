import React from 'react';
import PropTypes from 'prop-types';
import './ItemOption.scss';

const ItemOption = (props) => {
    const { text, onClick, value } = props;
    return (
        <button className="item-option" value={value} onClick={onClick}> {text} </button>
    );
};

ItemOption.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

ItemOption.defaultProps = {
    text: 'ItemOption',    
};

export default ItemOption;
