import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  backdrop: {},
}));
export default function CustomBackDrop({ open }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress />
    </Backdrop>
  );
}
