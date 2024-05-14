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
import LostFound from "./pages/LostFound";
import Forum from "./pages/Forum";
import Announcements from "./pages/Announcements";
import Citizen from "./pages/Citizen";
import Addresses from "./pages/Addresses";
import AdminForums from "./pages/AdminForums";
import AddAnnouncentModal from "./components/ui/AddAnnouncentModal";
import ChooseAddress from "./pages/ChooseAddress";

import AddressForums from "./pages/AddressForums";

export default function Routeer() {
  const token = useSelector(selectCurrentToken);

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
      path: "/choose-address",
      element: <ChooseAddress />,
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
          path: "announcements",
          element: <Announcements />,
        },
        {
          path: "forum",
          element: <Forum />,
        },
        {
          path: "lost-found",
          element: <LostFound />,
        },
        {
          path: "citizen",
          element: <Citizen />,
        },
        {
          path: "adm_addresses",
          element: <Addresses />,
        },
        {
          path: "adm_forums",
          element: <AdminForums />,
        },
        {
          path: "add_announcement",
          element: <AddAnnouncentModal />,
        },
        {
          path: "address-forum",
          element: <AddressForums />,
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
