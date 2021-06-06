import { fade } from "@material-ui/core";
import colors from "../../assets/colorPalette";

import { makeStyles } from "@material-ui/core";

const useCustomTreePageStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
  },
  paperPanel: {
    backgroundColor: colors.pink,
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  boldTitle: {
    fontWeight: "bold",
  },
  calendar: {
    padding: theme.spacing(2),
    backgroundColor: colors.pink,
    border: 'none',
  },
  fullWidth: {
    width: '100%',
  },
  typeEvent: {
    padding: '5px',
    borderRadius: 7,
    margin: '7px 0px',
    fontSize: '1rem',
    cursor: 'pointer',
    "&:hover" : {
      backgroundColor: "white",
    }
  },
  schedule: {
    alignItems: 'center'
  },
  textField: {
    width: '100%',
  },
  textError: {
    color: 'red',
  }
}));
export default useCustomTreePageStyles;
