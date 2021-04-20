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
  actionTitle: {
    margin: theme.spacing(1, 0),
    fontWeight: "900",
  },
  toggleButtons: {
    marginBottom: theme.spacing(2),
  },
  modeButtons: {
    backgroundColor: colors.white,
    "&:focus": {
      backgroundColor: colors.pink,
    },
    "&:hover": {
      backgroundColor: fade(colors.pink, 0.3),
    },
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 3),
  },
  toolSet: {
    position: "fixed",
    top: 130,
    right: 30,
  },
}));
export default useCustomTreePageStyles;
