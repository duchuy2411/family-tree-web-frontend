import { makeStyles } from "@material-ui/core";
import colors from "../../assets/colorPalette";

const useLoginPageStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#F2E1DA",
  },
  container: {
    padding: theme.spacing(5, 0),
    height: "100vh",
  },
  leftSide: {
    // backgroundColor: "red",
  },
  wrapper: {
    backgroundColor: "#905842",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  logo: {
    maxHeight: "15rem",
  },
  appTitle: {
    color: "#fff",
    marginTop: theme.spacing(3),
  },
  rightSide: {
    // backgroundColor: "blue",
    backgroundColor: colors.pink,
    height: "100%",
  },
  formAsColumnBorder: {
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
  },
  formAsRowBorder: {
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
  },
  withSpace: {
    margin: theme.spacing(1, 0),
  },
  inputFields: {
    backgroundColor: "white",
    borderRadius: 24,
    height: theme.spacing(5),
    maxWidth: "250px",
    padding: theme.spacing(0, 2, 0, 2),
  },
  btnLogin: {
    color: "#905842",
    backgroundColor: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    borderRadius: 24,
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
      color: "#fff",
    },
  },
}));

export default useLoginPageStyles;
