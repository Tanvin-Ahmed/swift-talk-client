import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PropTypes } from "prop-types";
// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

Loadable.propTypes = {
  Component: PropTypes.element,
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
