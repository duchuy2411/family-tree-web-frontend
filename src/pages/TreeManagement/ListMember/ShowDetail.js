import React from 'react'
import { Modal } from '@material-ui/core';
import useManagementTreeStyle from '../useTreeManagementStyles';
import moment from 'moment';
import { Grid, Typography, TextareaAutosize, TextField, FormControlLabel, FormControl, Checkbox, Button } from '@material-ui/core';

const ShowDetail = (props) => {
  const { showDetail, currentPerson, form, isFetchingCurrentPerson, error, handleChangeAddForm, handleCancel } = props;
  const classes = useManagementTreeStyle();

  return (
    <Modal open={showDetail} onClose={handleCancel}>
      <Grid container justify="center" className={classes.modalDetail}>
        { !isFetchingCurrentPerson ?
          (
            <React.Fragment>
              <Grid container justify="center" alignItems="center" xs={6}>
                <Grid item xs={12}>
                  <div style={{ backgroundImage: `url(${currentPerson.imageUrl})` }} className={classes.avatarDetail} />
                </Grid>
                <Grid item xs={12} className={classes.dateDetail}>
                  <Typography> {currentPerson.dateOfBirth ? moment(currentPerson.dateOfBirth).format('DD-MM-YYYY') : '--'} / {currentPerson.dateOfDeath ? moment(currentPerson.dateOfDeath).format('DD-MM-YYYY') : '--'}</Typography>
                </Grid>
              </Grid>
              <Grid container xs={6}>
                <Grid item xs={12}>
                  <Typography>First name: {currentPerson.firstName} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Last name: {currentPerson.lastName} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Occupation: {currentPerson.occupation} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Phone: {currentPerson.phone} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Address: {currentPerson.address} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <p>Notes: {currentPerson.notes} </p>
                </Grid>
              </Grid>
            </React.Fragment>
            )
          : (
            <React.Fragment>
              <span className={`fas fa-spinner fa-pulse ${classes.faSpinner}`}/>
              <span className={`fas fa-spinner fa-pulse ${classes.faSpinner}`}/>
              <span className={`fas fa-spinner fa-pulse ${classes.faSpinner}`}/>
            </React.Fragment>
          )
        }
      </Grid>
    </Modal>
  )
}

export default ShowDetail;