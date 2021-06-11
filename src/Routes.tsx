import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
// import { Switch } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout/RouteWithLayout";
import routes from './config/routes';
import Home from 'views/Home/Home';
import Main from 'layouts/Main/Main';
import Signin from 'views/Signin/Signin';
import NoLayout from 'layouts/NoLayout/NoLayout';

const Routes: React.FC = props => {
    return (
        // <Suspense fallback={<div>loading....</div>}>
        //     <Switch>
        //         {routes.map((item, key) => <RouteWithLayout key={key} name={item.name} layout={item.layout} component={item.component} exact path={item.path} />)}
        //     </Switch>
        // </Suspense>
        // <Switch>
        //     <RouteWithLayout component={Home} layout={Main} exact path="/" />
        //     <RouteWithLayout component={Signin} layout={NoLayout} exact path="/login" />
        // </Switch>
        <Switch>
            <Route exact path="/">
                <Main>
                    <Home />
                </Main>
            </Route>
            <Route exact path="/login">
                <NoLayout>
                    <Signin />
                </NoLayout>
            </Route>
            {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
    );
};

Routes.propTypes = {

};

export default Routes;