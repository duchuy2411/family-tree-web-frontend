import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import { deleteMemory, selectStatusCreating } from '../calendarSlice';
import GroupImage from '../GroupImage';

const CardList = (props) => {
  const {
    arrMemory
  } = props;
  const dispatch = useDispatch();
  const creating = useSelector(selectStatusCreating);
  const handleClickDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const rs = await handleDeleteMemory(id);
        if (rs) {
          swal("Your memory has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something error!", {
            icon: "error",
          });
        }
      }
    });
  }

  const handleDeleteMemory = (id) => {
    return dispatch(deleteMemory(id));
  }

  return (
    <React.Fragment className="scrollabel">
      { creating && (
        <Grid container xs={7} className="container-spinner">
          <i class="fas fa-spinner fa-pulse"></i>
          <i class="fas fa-spinner fa-pulse"></i>
          <i class="fas fa-spinner fa-pulse"></i>
        </Grid>
      )}
      {_.reverse([...arrMemory]).map(ele => (
        <Grid container xs={12} className="container-card list">
          <Grid item xs={2} className="avatar-card">
            <img src="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg" />
          </Grid>
          <Grid item xs={9} className="info-card">
            <div className="name-card">Đức Huy</div>
            <div className="time-card">{ moment(ele.memoryDate).format('DD-MM-YYYY') }</div>
          </Grid>
          <Grid item xs={1} className="more-card" onClick={() => handleClickDelete(ele.id)}>
            <div className="fas fa-trash"></div>
          </Grid>
          <Grid item xs={12} className="content-card">
            { ele.description }  
          </Grid>
          <Grid item xs={12}>
            <GroupImage
              arrayImages={ele.imageUrls}
            />
          </Grid>
        </Grid>
        )
      )}
    </React.Fragment>
  )
}

export default CardList;