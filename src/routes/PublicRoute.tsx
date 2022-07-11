import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Path } from "./routing";
import { userCredentials } from "../redux/userSlice";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector(userCredentials);

  if (!isAuthenticated) {
    return children;
  }
  return <Navigate to={Path.Courses} />;
};
