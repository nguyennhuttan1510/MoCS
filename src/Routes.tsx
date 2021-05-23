import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import RouteWithLayout from "./components/RouteWithLayout/RouteWithLayout";
import routes from './config/routes';

const Routes: React.FC = props => {
    return (
        <Suspense fallback={<div>loading....</div>}>
            <Switch>
                {routes.map((item, key) => <RouteWithLayout key={key} name="HomePage" layout={item.layout} component={item.component} exact={item.exact} path={item.path} />)}
            </Switch>
        </Suspense>
    );
};

Routes.propTypes = {

};

export default Routes;