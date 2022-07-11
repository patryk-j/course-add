import SignIn from "pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route as RouteModel } from "models/routing";
import SignUp from "pages/SignUp";
import Header from "../components";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import { Courses, AddCourse, Course } from "../pages/Courses";
import UserProfile from "../pages/UserProfile";
import Questionnaire from "../pages/Questionnaire";
import { Lesson, AddLesson, EditLesson } from "../pages/Courses/Lesson";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "redux/userSlice";
import { getUserById } from "../services/userActions";
import QuestionnaireRoute from "./QuestionnaireRoute";
import EditProfile from "../pages/UserProfile/components/EditProfile";

export const Path = {
  Home: '/',
  NoContent: "*",
  SignIn: "/signin",
  SignUp: "/signup",
  Courses: "/courses",
  Course: "/course",
  AddCourse: "/addCourse",
  UserProfile: "/userprofile",
  Questionnaire: "/questionnaire",
  Lesson: "/lesson",
  AddLesson: "/addLesson",
  EditLesson: "/editLesson",
  EditProfile: '/editprofiles'
};

export const routes: RouteModel[] = [
  {
    component: (
      <QuestionnaireRoute>
        <Questionnaire />
      </QuestionnaireRoute>
    ),
    path: Path.Questionnaire,
    title: "Questionnaire",
  },
  {
    component: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
    path: Path.SignIn,
    title: "Sign In",
  },
  {
    component: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
    path: Path.SignUp,
    title: "Sign Up",
  },
  {
    component: (
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    ),
    path: Path.Courses,
    title: "Courses",
  },
  {
    component: (
      <ProtectedRoute>
        <Course />
      </ProtectedRoute>
    ),
    path: `${Path.Course}/:courseId`,
    title: "Course",
  },
  {
    component: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
    path: Path.UserProfile,
    title: "User Profile",
  },
  {
    component: (
      <AdminRoute>
        <AddCourse />
      </AdminRoute>
    ),
    path: Path.AddCourse,
    title: "Add Course",
  },
  {
    component: (
      <ProtectedRoute>
        <Lesson />
      </ProtectedRoute>
    ),
    path: `${Path.Lesson}/:courseId/:lessonId`,
    title: "Lesson",
  },
  {
    component: (
      <AdminRoute>
        <AddLesson />
      </AdminRoute>
    ),
    path: `${Path.AddLesson}/:courseId`,
    title: "Add Lesson",
  },
  {
    component: (
      <AdminRoute>
        <EditLesson />
      </AdminRoute>
    ),
    path: `${Path.EditLesson}/:courseId/:lessonId`,
    title: "EditLesson",
  },
  {
    component: (
      <ProtectedRoute>
        <EditProfile/>
      </ProtectedRoute>
    ),
    path: Path.EditProfile,
    title: 'EditProfile',
  },
];

export const Router = () => {
  const action = useDispatch();

  useEffect(() => {
    const getAuthState = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {

          const { displayName, email, uid } = user;
          try {
            const { preferences, isAdmin } = await getUserById(uid);
            if (displayName && email) {
              action(
                setUser({
                  user: {
                    id: uid,
                    username: displayName,
                    email: email,
                    isAdmin,
                    userPreference: preferences,
                  },
                  isAuthenticated: true,
                })
              );
            }
          } catch (e) {}
        }
      });
    };
    getAuthState();
  }, [action]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
