import React, { lazy, Suspense } from 'react';
import IRoute from '../interfaces/route';

const Signin = lazy(()=>import('views/Signin/Signin')) ;
const NoLayout = lazy(()=>import('layouts/NoLayout/NoLayout')) ;
const Home = lazy(() => import("../views/Home/Home"));
const Main = lazy(() => import("../layouts/Main/Main"));



const routes: IRoute[] =[
    {
        path : "/",
        component:  Home ,
        layout: Main,
        exact: true,
        name: "Home Page"
    },
    // {
    //     path : "/detail-table",
    //     component: TableDetail,
    //     layout: Main,
    //     exact: true,
    //     name: "Detail Table Page"
    // }
];

export default routes;