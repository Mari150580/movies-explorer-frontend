import React from "react";
import { Navigate } from "react-router-dom";

const UnauthorizedRoute = ({ component: Component, ...props }) => {
  if (!props.isLoading) {
    return props.loggedIn ? (
        <Navigate to="/signup" replace/>
    ) : (
        <Navigate to="/movies" replace/>
    );
  }
};

export default UnauthorizedRoute;