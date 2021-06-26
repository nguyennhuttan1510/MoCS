import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import {
    Switch,
} from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout/RouteWithLayout";

import IRoute from 'interfaces/route';

const Signin = lazy(() => import('views/Signin/Signin'));
const NoLayout = lazy(() => import('layouts/NoLayout/NoLayout'));
const Home = lazy(() => import("views/Home/Home"));
const Admin = lazy(() => import("views/Admin/Admin"));
const Main = lazy(() => import("layouts/Main/Main"));
const ManagementStaff = lazy(() => import("views/ManagementStaff/ManagementStaff"));



const Routes: React.FC = props => {


    // CONFIG ROUTE

    const routes: IRoute[] = [
        {
            path: "/",
            component: Home,
            layout: Main,
            exact: true,
            name: "Home Page"
        },
        {
            path: "/login",
            component: Signin,
            layout: NoLayout,
            exact: true,
            name: "Login Page"
        },
        {
            path: "/admin",
            component: Admin,
            layout: Main,
            exact: true,
            name: "Admin Page"
        },
        {
            path: "/management-staff",
            component: ManagementStaff,
            layout: Main,
            exact: true,
            name: "Management Staff Page"
        },
    ];


    return (
        <Suspense fallback={<div>loading....</div>}>
            <Switch>
                {routes.map((item, key) => <RouteWithLayout key={key} name={item.name} layout={item.layout} component={item.component} exact path={item.path} />)}
            </Switch>
        </Suspense>
    );
};

Routes.propTypes = {

};

export default Routes;