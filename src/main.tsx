import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import { AppProviders } from "./appProvider/AppProvider";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { Home } from "./views/home/Home";
import { SignIn } from "./views/signIn/SignIn";
import { SignUp } from "./views/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
