import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

import './Loader.scss';

const Loader = (props) => {
    const { children, visible } = props;
    return (
        <>
            {visible && (
                <div className="loader-overlay">
                    <div className="loader-spinner">
                        <Spinner style={{ width: '6rem', height: '6rem' }} />
                    </div>
                </div>
            )}
            {children}
        </>
    );
};

Loader.propTypes = {
    visible: PropTypes.bool,
};

Loader.defaultProps = {
    visible: false,
};

export default Loader;
