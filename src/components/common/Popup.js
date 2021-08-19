import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const Popup = props => {
  return (
      <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {!!props.text && <DialogContentText>
            {props.text}
          </DialogContentText>}
          {!!props.context && props.context}
        </DialogContent>
        <DialogActions>
          {props.denyBtn && <Button onClick={props.onDeny} color="primary">
            {props.denyBtn}
          </Button>}
          {props.confirmBtn && <Button variant={"contained"} onClick={props.onConfirm} color="primary" autoFocus>
            {props.confirmBtn}
          </Button>}
        </DialogActions>
      </Dialog>
  );
};

Popup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
  denyBtn: PropTypes.string,
  onDeny: PropTypes.func,
  confirmBtn: PropTypes.string,
  onConfirm: PropTypes.func,
  context: PropTypes.any,
};

export default Popup;