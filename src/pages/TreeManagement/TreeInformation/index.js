import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Modal,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import moment from "moment";
import { selectUser } from "../../../store/authSlice";
import { selectTrees } from "../../Home/homeSlice";
import useTreeManagementStyle from "../useTreeManagementStyles";
import Permission from "../../../utils/permission";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

const TreeInformation = (props) => {
  const {
    open,
    formTree,
    currentTree,
    handleShow,
    handleClose,
    handleChange,
    handleDelete,
    handleSubmit,
  } = props;

  const classes = useTreeManagementStyle();
  const currentUser = useSelector(selectUser);
  const listTree = useSelector(selectTrees);
  const { id } = useParams();

  return (
    <Grid container>
      <Grid container xs={12}>
        <Grid item container xs={12}>
          <Grid item xs={12} className={classes.containerInformation}>
            <Box className={classes.publicMode}>{currentTree.publicMode ? "Share Family Tree" : "Private Family Tree"}</Box>
            <Box letterSpacing={15} className={classes.nameTree}>{currentTree.name}</Box>
            <p className={classes.description}>{currentTree.description}</p>
            <Typography className={classes.label}>
              Created at: {moment(currentTree.dateCreated).format("DD - MM - YYYY")}
            </Typography>
            <Typography className={classes.label}>
              Last modified: {moment(currentTree.lastModified).format("DD - MM - YYYY")}
            </Typography>
            {Permission.havePermissionAsOwner(id) && (
              <React.Fragment>
                <Button className={classes.btnSecond} onClick={handleShow} style={{ marginTop: "20px" }}>
                  Edit tree
                </Button>
                <Button
                  className={classes.btnPrimary}
                  onClick={handleDelete}
                  style={{ marginLeft: "10px", marginTop: "20px" }}
                >
                  Delete tree
                </Button>
              </React.Fragment>)
            }
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
              value={formTree.name}
              onChange={(e) => handleChange(e, "name")}
              className={classes.inputFields}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              type="text"
              value={formTree.description}
              onChange={(e) => handleChange(e, "description")}
              className={classes.inputFields}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.inputFields}
              control={
                <Checkbox
                  checked={formTree.publicMode}
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
