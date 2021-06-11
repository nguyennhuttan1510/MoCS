import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const NoLayout: React.FC = (props: {
    children?: React.ReactNode;
}) => {
    const { children } = props;
    return (
        <div className="nolayout" >
            {children}
        </div>
    );
};

NoLayout.propTypes = {

};

export default NoLayout;