import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardActions, CardContent, Typography, Avatar, Modal, TextField, Button, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

import useTreeManagementStyle from "../useTreeManagementStyles";
import {
  selectTrees,
} from "../../Home/homeSlice";
import { selectUser } from "../../../store/authSlice";
import Permission from "../../../utils/permission";
import CONST from "../../../utils/const";
const Contribute = (props) => {
  const { openEditor, value, owner, editors, handleSubmitEditor, handleChangeText, handleCloseEditor, handleClickEditor, handleRemoveEditor } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useTreeManagementStyle();
  const currentUser = useSelector(selectUser);
  const listTrees = useSelector(selectTrees);

  const renderCard = (image, nameUser, role, isDelete = false) => {
    return (
      <Grid item xs={3} className={classes.padding}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image || CONST.sourceDefaultImg}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {nameUser}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {role}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {isDelete && Permission.havePermissionAsOwner(id) &&
              (
                <Button size="small" color="secondary" onClick={() => handleRemoveEditor(nameUser)}>
                  Delete
                </Button>
              )
            }
            {!isDelete && Permission.havePermissionAsOwner(id) && (
              <Button size="small" color="primary" onClick={handleClickEditor}>
                Add editors
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container>
      {renderCard(_.get(owner, "avatarUrl", null), _.get(owner, "username", ""), "Owner")}
      {_.get(editors, "length") > 0 &&
        editors.map((ele) => renderCard(_.get(ele, "avatarUrl", null), _.get(ele, "username", ""), "Editors", true))
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
