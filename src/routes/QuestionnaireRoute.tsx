import React from "react";
import { useSelector } from "react-redux";
import { userCredentials } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
import { Path } from "./routing";

interface QuestionnaireRouteProps {
  children: JSX.Element;
}

const QuestionnaireRoute: React.FC<QuestionnaireRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, user } = useSelector(userCredentials);
  if (isAuthenticated && user?.userPreference && !user.userPreference.length) {
    return children;
  }

  return <Navigate to={Path.UserProfile} />;
};

export default QuestionnaireRoute;
