import { makeStyles } from "@material-ui/core";
import colors from "assets/colorPalette";

const useForgotPasswordPageStyles = makeStyles(() => ({
  root: {
    minHeight: "50vh",
  },
  paper: {
    padding: 24,
  },
  title: {
    marginBottom: 24,
  },
  alert: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    height: 45,
    backgroundColor: colors.brown,
  },
}));

export default useForgotPasswordPageStyles;
