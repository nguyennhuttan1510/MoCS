import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import IRoute from '../../interfaces/route';

export interface RouteConfig extends Pick<RouteProps, 'path' | 'exact'> {
  component: React.FC<RouteProps>
  layout: React.FC<RouteProps>
  // roles?: string[]
  // redirect?: string
  // disabled?: boolean
  route?: React.FC<RouteConfig>
  // autoScrollTop?: boolean
  onBeforeRender?(
    routeProps: RouteConfig,
    renderProps: RouteComponentProps<any, any, any>,
  ): void
}
const RouteWithLayout: React.FC<RouteConfig> = (props) => {
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
