import colors from "../../../../assets/colorPalette";
import { makeStyles } from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.pink,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    //
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.03) ",
      boxShadow: "0px 4px 4px 2px rgb(123,123,123,0.4)",
    },
  },
  // img & name
  gridAvaName: {
    backgroundColor: "purple",
    padding: theme.spacing(2),
  },
  imgFamily: {
    height: 100,
    // margin: theme.spacing(2),
    borderRadius: 16,
  },
  typoName: {
    fontWeight: 900,
    fontSize: 20,
    marginLeft: theme.spacing(2),
  },

  // updatedAt
  gridUpdatedAt: {
    backgroundColor: "green",
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

  // author
  gridAuthor: {
    backgroundColor: "pink",
  },

  // contributors
  gridAvatarGroup: {
    backgroundColor: "cyan",
  },
  avatarGroup: {
    marginLeft: theme.spacing(1),
    backgroundColor: "cyan",
    // flexGrow: 1,
  },

  // action buttons
  gridActions: {
    backgroundColor: "orange",
  },
  actionBtn: {
    textDecoration: "none",
    color: colors.black,
    border: "3px solid grey",
    borderRadius: "8px",
    padding: theme.spacing(1),
    marginRight: theme.spacing(2),

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //
    "&:hover": {
      backgroundColor: "#D8C8C2",
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
}));

export default useTreeItemStyles;
