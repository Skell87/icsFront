import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthContext, AuthContextProvider } from "./Context.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Header from "./Header";
import Login from "./Login.jsx";
import HomePage from "./HomePage.jsx";

const Protected = ({ component }) => {
  const { auth } = useContext(AuthContext);
  return auth.accessToken ? (
    <>{component}</>
  ) : (
    <Navigate to="/Login" replace={true} />
  );
};

function Layout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/HomePage",
        element: <Protected component={<HomePage />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
