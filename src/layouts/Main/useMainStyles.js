import { makeStyles } from "@material-ui/core";

const useMainLayoutStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height: "100vh",
    },
  },
}));

export default useMainLayoutStyles;
