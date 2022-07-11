import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Path } from "./routing";
import { userCredentials } from "redux/userSlice";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector(userCredentials);

  if (isAuthenticated) {
    if (user?.userPreference && !user.userPreference.length)
      return <Navigate to={Path.Questionnaire} />;
    return children;
  }
  return <Navigate to={Path.SignIn} />;
};
