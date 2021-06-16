import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#905842",
    },
    secondary: {
      main: "#F2E1DA",
    },
  },
});

const AlertNotConfirm = (props) => {
  const {
    warningAlternativeNode,
    warningUpdateForMarriage,
    handleHideAlertAlternative,
  } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div
          className="grayout-high"
          onClick={handleHideAlertAlternative}
        ></div>
        {warningAlternativeNode && (
          <div className="modal-form-delete high-modal">
            <Icon
              className="fa fa-exclamation-triangle"
              style={{ fontSize: "3.5rem", width: "2em" }}
              color="primary"
            />
            <div className="alert-content">
              Node's father or mother is not exists.
              <br />
              Adding a member as father or mother, system auto add a node called
              as "Alternative".
            </div>
            <div className="btn-alert">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleHideAlertAlternative}
              >
                OK
              </Button>
            </div>
          </div>
        )}
        {warningUpdateForMarriage && (
          <div className="modal-form-delete high-modal">
            <Icon
              className="fa fa-exclamation-triangle"
              style={{ fontSize: "3.5rem", width: "2em" }}
              color="primary"
            />
            <div className="alert-content">
              Node's spouses is exists as "Alternative".
              <br />
              Add a spouses in this case will update member
            </div>
            <div className="btn-alert">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleHideAlertAlternative}
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </div>
    </MuiThemeProvider>
  );
};

export default AlertNotConfirm;
