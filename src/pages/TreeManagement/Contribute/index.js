import React, { useState } from "react";
import { Grid, Card, Typography, Avatar, Modal, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

import useTreeManagementStyle from "../useTreeManagementStyles";
import {
  selectTrees,
} from "../../Home/homeSlice";
import { selectUser } from "../../../store/authSlice";
import Permission from "../../../utils/permission";

const Contribute = (props) => {
  const { openEditor, value, owner, editors, handleSubmitEditor, handleChangeText, handleCloseEditor, handleClickEditor, handleRemoveEditor } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useTreeManagementStyle();
  const currentUser = useSelector(selectUser);
  const listTrees = useSelector(selectTrees);

  return (
    <Grid container>
      <Grid item xs={2} className={classes.padding}>
        <Card className={classes.cardContribute}>
          <Avatar
            variant="rounded"
            src={_.get(owner, "avatarUrl", null)}
            className={classes.avatar}
          ></Avatar>
          <Typography className={classes.name}>Owner: {_.get(owner, "username", "")}</Typography>
        </Card>
      </Grid>
      {_.get(editors, "length") > 0 &&
        editors.map((ele) => (
          <Grid key={ele.id} item xs={2} className={classes.padding}>
            <Card className={classes.cardContribute}>
              <Avatar
                variant="rounded"
                src={_.get(ele, "avatarUrl", null)}
                className={classes.avatar}
              ></Avatar>
              <Typography className={classes.name}>
                Editors: {_.get(ele, "username", "")}
              </Typography>
              <Button color="primary" onClick={() => handleRemoveEditor(_.get(ele, "username", ""))}>
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      {Permission.havePermissionAsOwner(listTrees, id, currentUser.id) && (
        <Grid item xs={2} className={classes.padding}>
          <Card className={classes.cardContribute}>
            <Grid xs={12} className={classes.borderTrike} onClick={handleClickEditor}>
              {" "}
              +{" "}
            </Grid>
            <Typography className={classes.name}> Add editors </Typography>
          </Card>
        </Grid>)
      }
      <Modal
        open={openEditor}
        onClose={handleCloseEditor}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <TextField
            label="Name editor"
            variant="outlined"
            onChange={handleChangeText}
            value={value}
            className={classes.inputText}
          />
          <Button onClick={handleSubmitEditor} className={classes.btnPrimary}>
            Submit
          </Button>
        </div>
      </Modal>
    </Grid>
  );
};

export default Contribute;
