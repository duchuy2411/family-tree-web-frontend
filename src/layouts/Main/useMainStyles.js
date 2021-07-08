import { colors, makeStyles } from "@material-ui/core";

const useMainLayoutStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height: "100vh",
    },
    backgroundColor: colors.blue5,
  },
}));

export default useMainLayoutStyles;
