import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "./utils/store";

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
