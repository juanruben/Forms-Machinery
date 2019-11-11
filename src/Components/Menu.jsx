import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Menu.scss';

const Menu = (props) => {
    const { items } = props;
    return (
        <div className="sidebar">
            <div className="content">
                {items.map((item) => (
                    <Link key={item.id} to={item.path} className="sidebarLink">{item.title}</Link>
                ))}
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
