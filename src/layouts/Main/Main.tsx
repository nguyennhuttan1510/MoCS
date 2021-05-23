import React from 'react';
import PropTypes from 'prop-types';

const Main: React.FC = (props: {
    children?: React.ReactNode;
}) => {
    const { children } = props;
    return (
        <>
            {children}
        </>
    );
};

Main.propTypes = {

};

export default Main;