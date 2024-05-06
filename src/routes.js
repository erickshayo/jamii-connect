import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "./App/AuthSlice";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import PageNotFounnd from "./pages/pageNotFound";

export default function Routeer() {
  const token = useSelector(selectCurrentToken);
  console.log('====================================');
  console.log(token);
  console.log('====================================');

  const routes = useRoutes([
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/",
      element: token ? <Main /> : <Navigate to="/sign-in" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        {
          path: "dashboard",
          element: <Home />,
        },
        {
          path: "tables",
          element: <Tables />,
        },
        {
          path: "billing",
          element: <Billing />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
      element: <PageNotFounnd />,
    },
  ]);

  return routes;
}
