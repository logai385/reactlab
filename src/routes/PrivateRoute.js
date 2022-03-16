import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_STOGARE_TOKEN_NAME } from "../ultil/systemSettings";
import { CHECK_AUTH_API } from "../redux/auth/AuthConst";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated) || !!localStorage.getItem(LOCAL_STOGARE_TOKEN_NAME);
  useEffect(() => {
    dispatch({ type: CHECK_AUTH_API });
    return () => {      
    }
  }, [])
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
