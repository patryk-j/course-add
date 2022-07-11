import React from "react";
import { useSelector } from "react-redux";
import { userCredentials } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
import { Path } from "./routing";

interface AdminRouteProps {
  children: JSX.Element;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useSelector(userCredentials);

  if (user?.isAdmin) {
    return children;
  }
  return <Navigate to={Path.Courses} />;
};
