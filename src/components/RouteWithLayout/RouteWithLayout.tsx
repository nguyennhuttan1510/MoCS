import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Route, RouteComponentProps, RouteProps, useHistory } from 'react-router-dom';
import IRoute from '../../interfaces/route';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
// export interface RouteConfig extends Pick<RouteProps, 'path' | 'exact'> {
//   component: React.FC<RouteProps>
//   layout: React.FC<RouteProps>
//   // roles?: string[]
//   // redirect?: string
//   // disabled?: boolean
//   route?: React.FC<RouteConfig>
//   // autoScrollTop?: boolean
//   onBeforeRender?(
//     routeProps: RouteConfig,
//     renderProps: RouteComponentProps<any, any, any>,
//   ): void
// }
const RouteWithLayout: React.FC<IRoute> = (props) => {
  const { layout: Layout, component: Component, path, ...rest } = props;
  const history = useHistory();
  const profile = useSelector((state: any) => state.staffs.profile);
  //   if()
  useEffect(() => {
    console.log(profile)
    if (!profile?.name) {
      history.push('/login')
    }
  }, [])
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
