import { fade, makeStyles } from "@material-ui/core";
import colors from "../../../../assets/colorPalette";

const useAppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: colors.blue2,
  },
  toolBarOffset: theme.mixins.toolbar,
  leftArea: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    textDecoration: "none",
    color: colors.white,
    fontWeight: "bold",
  },
  centerArea: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: "8vw",
    borderBottomWidth: 4,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    color: "white",
    borderRadius: 8,
    margin: "0px 4px",
  },
  navButtonHighlight: {
    borderBottomColor: colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  navIconHighlight: {
    color: colors.white,
  },
  notificationsButton: {
    margin: "0px 4px",
    backgroundColor: fade(colors.white, 0.1),
    "&:hover, &:active": {
      backgroundColor: fade(colors.white, 0.3),
    },
  },
  notificationsButtonHighlight: {
    color: colors.white,
    backgroundColor: fade(colors.white, 0.3),
  },
  avatarBtn: {
    margin: theme.spacing(0, 0),
    padding: "3px",
    borderRadius: "50%",
  },
  avatarBtnActive: {
    border: `3px solid ${colors.white}`,
    padding: 0,
  },
}));

export default useAppBarStyles;
