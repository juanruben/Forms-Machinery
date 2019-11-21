import React from 'react';
import './ItemOption.scss';

const ItemOption = (props) => {
    const { text, onClick, value } = props;
    return (
        <button className="item-option" value={value} onClick={onClick}> {text} </button>
    );
};

ItemOption.defaultProps = {
    text: 'ItemOption',    
};

export default ItemOption;
