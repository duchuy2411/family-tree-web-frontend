import React from 'react';
import { createMuiTheme, useTheme, MuiThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#905842',
    },
    secondary: {
      main: '#F2E1DA',
    },
  },
})

const AlertModal = (props) => {
  const {
    warning,
    handleHideAlert,
    deleteNode
  } = props;
  
  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
      <div className="grayout" onClick={handleHideAlert}></div>
      { warning ?
        (
          <div className="modal-form-delete">
            <Icon className="fa fa-exclamation-triangle" style={{fontSize: "4rem", width: "2em"}} color="primary" />
            <div className="alert-content">
              You can't delete this node.
              Please delete node's all child.
            </div>
            <div className="btn-alert">
              <Button variant="contained" color="primary" onClick={handleHideAlert}>
                Exit
              </Button>
            </div>
        </div>
        ) :
        (
          <div className="modal-form-delete">
            <Icon className="fa fa-exclamation-triangle" style={{fontSize: "4rem", width: "2em"}} color="primary" />
            <div className="alert-content">Are you sure delete this node?</div>
            <div className="btn-alert">
              <Button variant="contained" color="primary" onClick={handleHideAlert}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" style={{marginLeft: "10px"}} onClick={deleteNode} >
                Delete
              </Button>
            </div>
          </div>
        )
      }
      </div>
    </MuiThemeProvider> 
  )
}

export default AlertModal;