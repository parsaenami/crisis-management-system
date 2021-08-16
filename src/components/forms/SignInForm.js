import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, FormControlLabel, InputLabel, Switch, TextField, Typography } from "@material-ui/core";
import { CustomButton } from "../buttons/CustomButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  switch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& label:first-child': {
      padding: theme.spacing(1.5),
      color: theme.palette.primary.main,
    },
  },
}));

const SignInForm = props => {
  const classes = useStyle();

  return (
      <>
        <Typography gutterBottom color={"textSecondary"}>
          با استفاده از شماره‌ی تماس و یا کد ملی خود، وارد حساب کاربری خود شوید.
        </Typography>
        <div className={classes.switch}>
          <InputLabel color={"primary"} htmlFor={"signin-switch"}>شماره‌ی تماس</InputLabel>
          <FormControlLabel
              label="کد ملی"
              control={
                <Switch
                    id="signin-switch"
                    color={"primary"}
                    value={props.type}
                    onChange={props.setType}
                    checked={props.type}
                />
              }
          />
        </div>

        <TextField
            variant={"filled"}
            type="number"
            id={props.type ? 'nationalId' : 'phoneNumber'}
            name={props.type ? 'nationalId' : 'phoneNumber'}
            label={props.type ? 'کد ملی' : 'شماره‌ی تماس'}
            value={props.userNumber}
            onChange={props.onUserNumberChangeFn}
            error={!!props.error}
            helperText={props.error}
        />
        {!props.isMobileDisplay &&
        <CustomButton variant={"contained"} size={"large"} onClick={props.submit}>
          {props.loading ? <CircularProgress size={26}/> : 'ورود به حساب کاربری'}
        </CustomButton>}
      </>
  );
};

SignInForm.propTypes = {
  isMobileDisplay: PropTypes.bool,
  submit: PropTypes.func,
  type: PropTypes.bool,
  loading: PropTypes.bool,
  setType: PropTypes.func,
  userNumber: PropTypes.string,
  onUserNumberChangeFn: PropTypes.func,
  error: PropTypes.string,
};

export default SignInForm;