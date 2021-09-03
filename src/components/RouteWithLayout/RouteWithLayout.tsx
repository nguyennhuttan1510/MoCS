import React from "react";
import { Route, useHistory } from "react-router-dom";
import IRoute from "../../interfaces/route";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const RouteWithLayout: React.FC<IRoute> = (props) => {
  const { layout: Layout, component: Component, path, ...rest } = props;
  const history = useHistory();
  const profile = useSelector((state: any) => state.user.profile);
  useEffect(() => {
    if (!profile?.name) {
      history.push("/login");
    }
  }, []);
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

export default RouteWithLayout;
