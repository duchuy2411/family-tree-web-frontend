import { Backdrop, CircularProgress } from "@material-ui/core";

export default function CustomBackDrop({ open }) {
  return (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  );
}
