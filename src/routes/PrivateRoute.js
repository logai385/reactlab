import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOCAL_STOGARE_TOKEN_NAME } from "../ultil/systemSettings";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated) || !!localStorage.getItem(LOCAL_STOGARE_TOKEN_NAME);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
