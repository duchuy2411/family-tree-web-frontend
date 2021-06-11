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
    backgroundColor: colors.white,
  },
  toolBarOffset: theme.mixins.toolbar,
  leftArea: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    textDecoration: "none",
    color: colors.brown,
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

    borderRadius: 8,
    margin: "0px 4px",
  },
  navButtonHighlight: {
    borderBottomColor: colors.brown,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  navIconHighlight: {
    color: colors.brown,
  },
  notificationsButton: {
    margin: "0px 4px",
    backgroundColor: fade(colors.brown, 0.1),
    "&:hover, &:active": {
      backgroundColor: fade(colors.brown, 0.3),
    },
  },
  notificationsButtonHighlight: {
    color: colors.brown,
    backgroundColor: fade(colors.brown, 0.3),
  },
  avatarBtn: {
    margin: theme.spacing(0, 0),
    padding: "3px",
    borderRadius: "50%",
  },
  avatarBtnActive: {
    border: `3px solid ${colors.brown}`,
    padding: 0,
  },
}));

export default useAppBarStyles;
