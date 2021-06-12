import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import Loading from "../UI/Loading";
import Error from "../UI/Error";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    "getSecretToken",
    () =>
      axios({
        method: "get",
        url: "/api/user/secret",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
    { retry: false }
  );
  if (isLoading) return <Loading />;
  if (isError) return <Redirect to="/" />;
  // if (isSuccess) {
  //   console.log(data.data);
  // }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSuccess) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
