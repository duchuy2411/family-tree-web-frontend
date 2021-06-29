import { fade, makeStyles } from "@material-ui/core/styles";
import colors from "assets/colorPalette";

const useSignupPageStyles = makeStyles((theme) => ({
  root: {
    // padding: "0 15vw",
    backgroundColor: "#F2E1DA",
  },
  wrapper: {
    height: "100vh",
    maxWidth: theme.breakpoints.width("lg"),
    padding: 24,
    margin: "0 auto",
  },
  leftSide: {
    // backgroundColor: "red",
  },
  paperLeftSide: {
    backgroundColor: "#905842",
    height: "60vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  logo: {
    maxHeight: "300px",
  },
  appTitle: {
    color: "#fff",
    marginTop: theme.spacing(3),
  },
  subText: {
    marginBottom: 8,
    color: colors.brown,
  },
  rightSide: {
    padding: 16,
  },
  withSpace: {
    margin: theme.spacing(1, 0),
  },
  inputFields: {
    backgroundColor: "white",
    borderRadius: 24,
    height: theme.spacing(5),
    padding: theme.spacing(0, 2, 0, 2),
  },
  btnLogin: {
    color: "#905842",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: fade("#fff", 0.6),
    },
    fontWeight: "bold",
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    borderRadius: 24,
  },
  passwordFields: {},
  gridItemPadding: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#905842",
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: fade(colors.brown, 0.6),
    },
  },
}));

export default useSignupPageStyles;
