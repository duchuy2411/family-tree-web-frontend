import { lazy } from "react";

const pageRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./Home")),
  },
  {
    path: "/home",
    exact: false,
    component: lazy(() => import("./Home")),
  },
  {
    path: "/calendar",
    exact: false,
    component: lazy(() => import("./Calendar")),
  },
  {
    path: "/user",
    exact: false,
    component: lazy(() => import("./User")),
  },
];

export default pageRoutes;
