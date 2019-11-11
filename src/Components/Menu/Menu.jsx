import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../State';
import './Menu.scss';

const Menu = (props) => {
    const { items } = props;
    const [, dispatch] = useStateValue();

    const test = () => {
        dispatch({
            type: 'EXIT',
        });
    };

    return (
        <div className="sidebar">
            <div className="content">
                {items.map((item) => (
                    <Link key={item.id} to={item.path} className="sidebarLink">{item.title}</Link>
                ))}
                <button type="button" onClick={test}>Salir</button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

export default Menu;
