import React, { lazy, Suspense } from 'react';
import IRoute from '../interfaces/route';
const Home = lazy(() => import("../views/Home/Home"));
const Main = lazy(() => import("../layouts/Main/Main"));

const routes: IRoute[] =[
    {
        path : "/",
        component: Home,
        layout: Main,
        exact: true,
        name: "Home Page"
    },
    // {
    //     path : "/about",
    //     component: About,
    //     layout: Main,
    //     exact: true,
    //     name: "About Page"
    // }
];

export default routes;