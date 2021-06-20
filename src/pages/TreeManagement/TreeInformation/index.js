import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Modal,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";

import CONSTANT from "../../../utils/const";
import useTreeManagementStyle from "../useTreeManagementStyles";

const TreeInformation = (props) => {
  const { formTree, currentTree, handleChange, handleDelete, handleSubmit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useTreeManagementStyle();

  const handleClose = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <Grid container>
      <Grid container xs={12}>
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <Typography>Name tree: {currentTree.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.label}>
              Date created: {moment(currentTree.dateCreated).format("DD - MM - YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <Typography>Description: {currentTree.description}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.label}>
              Date updated: {moment(currentTree.lastModified).format("DD - MM - YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <Typography>Public mode: {currentTree.publicMode ? "Public" : "Private"}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button className={classes.btnSecond} onClick={handleShow}>
              Edit tree
            </Button>
            <Button
              className={classes.btnPrimary}
              onClick={handleDelete}
              style={{ marginLeft: "10px" }}
            >
              Delete tree
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalCustom}
      >
        <Grid container className={classes.modal}>
          <Grid item xs={12}>
            <TextField
              label="Tree name"
              variant="outlined"
              type="text"
              value={currentTree.name}
              onChange={(e) => handleChange(e, "name")}
              className={classes.inputFields}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              type="text"
              value={currentTree.description}
              onChange={(e) => handleChange(e, "description")}
              className={classes.inputFields}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.inputFields}
              control={
                <Checkbox
                  checked={currentTree.publicMode}
                  onChange={(e) => handleChange(e, "publicMode")}
                  name="public"
                />
              }
              label="Public mode"
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <Button className={classes.btnSecond} onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button className={classes.btnPrimary} onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default TreeInformation;
