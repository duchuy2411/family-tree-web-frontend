import { makeStyles } from "@material-ui/core";
import colors from "../../../../assets/colorPalette";

const useNavBarStyles = makeStyles((theme) => ({
  navBar: {
    height: "96vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.brown,
    borderRadius: theme.spacing(3),
  },
  imgLogo: {
    width: 40,
    marginTop: theme.spacing(4),
  },
  iconBtn: {
    color: colors.white,
    margin: theme.spacing(2, 0),
    "&:hover, &:focus, &:active": {
      color: colors.focus,
    },
  },
  iconLogout: {
    width: 20,
    height: 20,
    fill: colors.white,
    // marginBottom: theme.spacing(2),
  },
  iconScaleUp: {
    width: 80,
    backgroundColor: "green",
  },
}));

export default useNavBarStyles;
