import { fade, makeStyles } from "@material-ui/core";
import colors from "../../assets/colorPalette";

const useLoginPageStyles = makeStyles((theme) => ({
  root: {
    // padding: "0 15vw",
    backgroundColor: colors.blue5,
  },
  wrapper: {
    height: "100vh",
    maxWidth: theme.breakpoints.width("lg"),
    padding: 24,
    margin: "0 auto",
  },
  leftSide: {},
  paperLeftSide: {
    backgroundColor: colors.blue1,
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
    color: colors.blue2,
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
    // maxWidth: "400px",
  },
  btnLogin: {
    color: colors.blue2,
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
    color: colors.blue2,
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: fade(colors.blue2, 0.6),
    },
  },
  // root: {
  //   minHeight: "100vh",
  //   backgroundColor: colors.pink,
  // },
  // container: {
  //   height: "60vh",
  //   backgroundColor: "green",
  // },
  // leftSide: {
  //   backgroundColor: "violet",
  // },
  // wrapper: {
  //   height: "100vh",
  //   maxWidth: theme.breakpoints.width("lg"),
  //   padding: 24,
  //   margin: "0 auto",
  // },
  // paperLeftSide: {
  //   backgroundColor: "#905842",
  //   height: "60vh",
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 24,
  // },
  // logo: {
  //   maxHeight: "300px",
  // },
  // appTitle: {
  //   color: "#fff",
  //   marginTop: theme.spacing(3),
  // },
  // rightSide: {
  //   backgroundColor: colors.pink,
  //   height: "100%",
  // },
  // formAsColumnBorder: {
  //   borderBottomLeftRadius: theme.spacing(2),
  //   borderBottomRightRadius: theme.spacing(2),
  // },
  // formAsRowBorder: {
  //   borderTopRightRadius: theme.spacing(2),
  //   borderBottomRightRadius: theme.spacing(2),
  // },
  // withSpace: {
  //   margin: theme.spacing(1, 0),
  // },
  // inputFields: {
  //   backgroundColor: "white",
  //   borderRadius: 24,
  //   height: theme.spacing(5),
  //   maxWidth: "250px",
  //   padding: theme.spacing(0, 2, 0, 2),
  // },
  // btnLogin: {
  //   color: "#905842",
  //   backgroundColor: "#fff",
  //   fontWeight: "bold",
  //   textDecoration: "none",
  //   marginBottom: theme.spacing(2),
  //   borderRadius: 24,
  // },
  // link: {
  //   textDecoration: "none",
  //   fontWeight: "bold",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   color: "#905842",
  //   marginBottom: theme.spacing(1),
  //   "&:hover": {
  //     color: "#fff",
  //   },
  // },
}));

export default useLoginPageStyles;
