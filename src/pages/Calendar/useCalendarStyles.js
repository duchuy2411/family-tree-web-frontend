import colors from "../../assets/colorPalette";

import { makeStyles } from "@material-ui/core";

const useCustomTreePageStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    margin: "20px auto",
    maxWidth: "1144px",
    width: "80%",
  },
  paperPanel: {
    backgroundColor: colors.blue5,
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  boldTitle: {
    fontWeight: "bold",
  },
  calendar: {
    padding: theme.spacing(2),
    backgroundColor: colors.blue5,
    border: "none",
  },
  fullWidth: {
    width: "100%",
  },
  typeEvent: {
    padding: "5px",
    borderRadius: 7,
    margin: "7px 0px",
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  schedule: {
    alignItems: "center",
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1)
  },
  textError: {
    color: "red",
  },
  selectedMode: {
    backgroundColor: "white",
    color: "black",
  },
}));
export default useCustomTreePageStyles;
