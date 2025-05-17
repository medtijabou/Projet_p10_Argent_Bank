import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // On vérifie si le token existe dans Redux ou dans localStorage
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const tokenFromStorage = localStorage.getItem("authToken");

  const isAuthenticated = tokenFromRedux || tokenFromStorage;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
