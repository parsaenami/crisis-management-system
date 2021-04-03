import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const AccessDenied = props => {

  return (
      <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">خطای دسترسی</DialogTitle>*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            برای ورود به این قسمت باید وارد حساب کاربری خود شوید و اگر حساب کاربری ندارید ثبت‌نام کنید.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            انصراف
          </Button>
          <Button onClick={() => {
            props.handleClose()
            props.action()
          }} color="primary" variant={"contained"} autoFocus>
            ورود | ثبت‌نام
          </Button>
        </DialogActions>
      </Dialog>
  );
};

AccessDenied.propTypes = {
  open: PropTypes.bool,
  action: PropTypes.func,
  handleClose: PropTypes.func,
};

export default AccessDenied;