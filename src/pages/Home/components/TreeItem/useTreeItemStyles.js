import colors from "../../../../assets/colorPalette";
import { makeStyles } from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    //
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.01) ",
      boxShadow: `0px 4px 4px 2px ${colors.blue5}`,
    },
    [theme.breakpoints.down("md")]: {
      padding: 8,
    },
  },

  // ava + info
  gridTree: {
    // backgroundColor: "purple",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  gridInfo: {
    // backgroundColor: "yellow",
  },
  imgFamily: {
    height: 100,
    borderRadius: 16,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1),
    },
  },
  typoName: {
    // backgroundColor: "purple",
    fontWeight: 900,
    fontSize: 20,
  },

  // updatedAt
  gridUpdatedAt: {
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconTime: {
    marginRight: theme.spacing(1),
  },
  typoUpdatedAt: {
    // backgroundColor: "green",
  },

  // contributors
  gridAvatarGroup: {
    // backgroundColor: "cyan",
  },
  avatarGroup: {
    // backgroundColor: "cyan",
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(1),
    },
  },

  // for owner style: bigger than others
  avatarBorder: {
    border: `2px solid ${theme.palette.background.paper}`,
  },
  avatarOwner: {
    transform: "scale(1.3)",
  },
  // -- end for owner style: bigger

  // action buttons
  gridActions: {
    // backgroundColor: "orange",
    padding: theme.spacing(2),
    [theme.breakpoints.up("xl")]: {
      "& :not(:first-child)": {
        // backgroundColor: "blue",
        marginLeft: theme.spacing(1),
      },
    },
    // },
    [theme.breakpoints.only("lg")]: {
      // backgroundColor: "blue",
      display: "flex",
      flexDirection: "column",
      "& :first-child": {
        marginBottom: theme.spacing(2),
      },
    },
    [theme.breakpoints.down("md")]: {
      // backgroundColor: "blue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  actionBtn: {
    textDecoration: "none",
    color: colors.black,
    border: `2px solid ${colors.blue1}`,
    borderRadius: "8px",
    padding: theme.spacing(1),
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //
    "&:hover": {
      backgroundColor: colors.blue5,
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#D8C8C2",
      borderColor: "#D8C8C2",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(242,225,218,.5)",
    },
  },
  menuItem: {
    margin: "0px 0px",
  },
  menuList: {
    backgroundColor: colors.pink,
  },
  nameTree: {
    color: colors.white,
    backgroundColor: colors.blue4,
    padding: "2vw",
    borderRadius: "5px",
  },
  moreMenu: {
    "-webkit-box-shadow": "2px 2px 10px 2px rgba(224,224,224,1)",
    "-moz-box-shadow": "2px 2px 10px 2px rgba(224,224,224,1)",
    "box-shadow": "2px 2px 10px 2px rgba(224,224,224,1)",
  },
}));

export default useTreeItemStyles;
