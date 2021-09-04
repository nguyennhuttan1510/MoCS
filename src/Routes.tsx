import React, { lazy, Suspense } from "react";
import { Switch, useLocation } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout/RouteWithLayout";

import IRoute from "interfaces/route";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

import "style/_Root.scss";

const Signin = lazy(() => import("views/Signin/Signin"));
const NoLayout = lazy(() => import("layouts/NoLayout/NoLayout"));
const Home = lazy(() => import("views/Home/Home"));
const Admin = lazy(() => import("views/Admin/Admin"));
const Main = lazy(() => import("layouts/Main/Main"));
const ManagementStaff = lazy(() => import("views/ManagementStaff"));
const Profile = lazy(() => import("views/Profile"));

const Routes: React.FC = (props: any) => {
  // CONFIG ROUTE
  const location = useLocation();
  const override = css`
    border-color: #001529;
  `;
  const routes: IRoute[] = [
    {
      path: "/MoCS",
      component: Home,
      layout: Main,
      exact: true,
      name: "Home Page",
    },
    {
      path: "/login",
      component: Signin,
      layout: NoLayout,
      exact: true,
      name: "Login Page",
    },
    {
      path: "/admin/management-business",
      component: Admin,
      layout: Main,
      exact: true,
      name: "Admin Page",
    },
    {
      path: "/admin/management-staff",
      component: ManagementStaff,
      layout: Main,
      exact: true,
      name: "Management Staff Page",
    },
    {
      path: "/profile/:id",
      component: Profile,
      layout: Main,
      exact: true,
      name: "Profile Page",
    },
  ];

  return (
    <Suspense
      fallback={
        location.pathname !== "/login" && (
          <div className="loading">
            <ScaleLoader loading={true} css={override} color={"#001529"} />
          </div>
        )
      }
    >
      <Switch>
        {routes.map((item, key) => (
          <RouteWithLayout
            key={key}
            name={item.name}
            layout={item.layout}
            component={item.component}
            exact={item.exact}
            path={item.path}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {};

export default Routes;
