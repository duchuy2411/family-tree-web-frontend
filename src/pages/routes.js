import { lazy } from "react";

const routes = [
  {
    path: "/feed",
    exact: true,
    component: lazy(() => import("./Feed")),
  },
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./HomePage")),
  },
];

export default routes;
