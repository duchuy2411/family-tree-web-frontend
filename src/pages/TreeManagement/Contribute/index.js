import React, { useState } from "react";
import { Grid, Card, Typography, Avatar, Modal, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

import useTreeManagementStyle from "../useTreeManagementStyles";
import {
  addEditor,
  selectTrees,
  // removeEditor
} from "../../Home/homeSlice";
import { selectUser } from "../../../store/authSlice";
import Permission from "../../../utils/permission";

const Contribute = (props) => {
  const { owner, editors } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useTreeManagementStyle();
  const currentUser = useSelector(selectUser);
  const listTrees = useSelector(selectTrees);

  const handleChangeText = (e) => {
    setValue(e.target.value);
  };

  // const handleRemoveEditor = (name) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this tree!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       dispatch(removeEditor(name));
  //     }
  //   });
  // };

  const handleSubmit = async () => {
    await dispatch(addEditor(id, { usernames: [value] }));
    setOpen(false);
    setValue("");
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            </Card>
          </Grid>
        ))}
      {Permission.havePermissionAsOwner(listTrees, id, currentUser.id) && (
        <Grid item xs={2} className={classes.padding}>
          <Card className={classes.cardContribute}>
            <Grid xs={12} className={classes.borderTrike} onClick={handleClick}>
              {" "}
              +{" "}
            </Grid>
            <Typography className={classes.name}> Add editors </Typography>
          </Card>
        </Grid>)
      }
      <Modal
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleSubmit} className={classes.btnPrimary}>
            Submit
          </Button>
        </div>
      </Modal>
    </Grid>
  );
};

export default Contribute;
