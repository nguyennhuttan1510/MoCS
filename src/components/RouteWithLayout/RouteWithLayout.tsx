import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import IRoute from '../../interfaces/route';

// type Props = {
//     Layout?: any;
//     Component?: any;
//     exact: boolean;
//     path: string;
//   }
const RouteWithLayout: React.FunctionComponent<IRoute> = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout {...matchProps}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {};

export default RouteWithLayout;
