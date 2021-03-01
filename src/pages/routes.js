import { lazy } from "react";

const pageRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./Home")),
  },
  {
    path: "/login",
    exact: false,
    component: lazy(() => import("./LogIn")),
  },
  {
    path: "/signup",
    exact: false,
    component: lazy(() => import("./SignUp")),
  },
];

export default pageRoutes;
