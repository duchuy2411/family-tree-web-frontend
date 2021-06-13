import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Avatar, Modal, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

import useTreeManagementStyle from '../useTreeManagementStyles';
import { addEditor, removeEditor } from '../../Home/homeSlice';

const Contribute = (props) => {
  const { owner, editors } = props;
  const [open, setOpen ] = useState(false);
  const [value, setValue] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useTreeManagementStyle();

  const handleChangeText = (e) => {
    setValue(e.target.value)
  }

  const handleRemoveEditor = (name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this tree!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(removeEditor(name));
      }
    });
  }
  const handleSubmit = async () => {
    const rs = await dispatch(addEditor(id, { usernames: [value] } ));
    setOpen(false);
    setValue('');
  }

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid container>
      <Grid item xs={2} className={classes.padding}>
        <Card className={classes.cardContribute}>
          <Avatar variant="rounded" src={_.get(owner, 'avatarUrl' , null)} className={classes.avatar}></Avatar>
          <Typography className={classes.name}>Owner: {_.get(owner, 'username', '')}</Typography>
        </Card>
      </Grid>
      {
        _.get(editors, 'length') > 0 &&
        editors.map(ele => (
          <Grid item xs={2} className={classes.padding}>
            <Card className={classes.cardContribute}>
              <Avatar variant="rounded" src={_.get(ele, 'avatarUrl' , null)} className={classes.avatar}></Avatar>
              <Typography className={classes.name}>Editors: {_.get(ele, 'username', '')}</Typography>
            </Card>
          </Grid>
        )) 
      }
      <Grid item xs={2} className={classes.padding}>
        <Card className={classes.cardContribute}>
          <Grid xs={12} className={classes.borderTrike} onClick={handleClick}> + </Grid>
          <Typography className={classes.name}> Add editors </Typography>
        </Card>
      </Grid>
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
            className={classes.inputText}/>
          <Button onClick={handleSubmit} className={classes.btnPrimary}>Submit</Button>
        </div>
      </Modal>
    </Grid>
  )
}

export default Contribute;