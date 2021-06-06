/**
 * all routes of app
 * each route has:
 * @param path - string - path of route
 * @param exact - boolean - exact prop
 * @param component - ReactComponent - Component to be rendered
 * @param description - string - description for aria-label of iconButton on navbar
 * @param icon - MUI Icon Component - icon for iconButton on navbar
 * @param onNavBar - boolean - this route stay on navbar or not?
 */

import { lazy } from "react";

// icons
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";

const pageRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./Home")),
    description: "go to home",
    icon: <HomeIcon />,
    onNavBar: true,
  },
  {
    path: "/calendar",
    exact: false,
    component: lazy(() => import("./Calendar")),
    description: "go to calendar",
    icon: <DateRangeIcon />,
    onNavBar: true,
  },
  {
    path: "/user",
    exact: false,
    component: lazy(() => import("./UserProfile")),
    description: "go to user page",
    icon: <PersonIcon />,
    onNavBar: true,
  },
  {
    path: "/custom-tree/:id",
    exact: false,
    component: lazy(() => import("./CustomTree")),
    description: "go to custom tree",
    onNavBar: false,
  },
];

export default pageRoutes;
