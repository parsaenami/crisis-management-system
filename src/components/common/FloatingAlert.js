import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import RTL from "../../helpers/RTL";
import Theme from "../../helpers/Theme";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FloatingAlert = props => {
  return (
      <RTL>
        <MuiThemeProvider theme={Theme}>
          <Snackbar
              anchorOrigin={{vertical: "top", horizontal: "center"}}
              open={props.open}
              autoHideDuration={props.duration}
              onClose={props.handleClose}
          >
            <Alert className={'w-100'} onClose={props.handleClose} severity={props.type}>
              {props.text}
            </Alert>
          </Snackbar>
        </MuiThemeProvider>
      </RTL>
  );
};

FloatingAlert.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']),
  duration: PropTypes.number,
};

FloatingAlert.defaultProps = {
  type: 'info',
  text: 'some informative message',
  duration: 5000,
}

export default FloatingAlert;