import { makeStyles } from "@material-ui/core/styles";

const useSignupPageStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15%",
    backgroundColor: "#F2E1DA",
  },
  wrapper: {
    padding: theme.spacing(5, 0),
    height: "100vh",
    // backgroundColor: "red",
  },
  leftSide: {
    // backgroundColor: "red",
  },
  paperLeftSide: {
    backgroundColor: "#905842",
    height: "600px",
    width: "600px",
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
  rightSide: {
    // backgroundColor: "green",
  },
  withSpace: {
    margin: theme.spacing(1, 0),
  },
  inputFields: {
    backgroundColor: "white",
    borderRadius: 24,
    height: theme.spacing(5),
    maxWidth: "550px",
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
  passwordFields: {
    maxWidth: "250px",
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

export default useSignupPageStyles;