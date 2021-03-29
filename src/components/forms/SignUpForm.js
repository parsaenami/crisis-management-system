import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from "@material-ui/core";
import { CustomButton } from "../buttons/CustomButton";

const SignUpForm = props => {
  return (
      <>
        <Typography gutterBottom color={"textSecondary"}>
          برای ثبت‌نام، اطلاعات زیر را وارد نمایید.
        </Typography>
        <TextField
            variant={"filled"}
            id={'firstName'}
            name={'firstName'}
            value={props.userInfo.firstName}
            label={"نام"}
            onChange={props.onUserInfoChangeFn}
            error={!!props.errors.firstName}
            helperText={props.errors.firstName}
        />
        <TextField
            variant={"filled"}
            id={'lastName'}
            name={'lastName'}
            value={props.userInfo.lastName}
            label={"نام خانوادگی"}
            onChange={props.onUserInfoChangeFn}
            error={!!props.errors.lastName}
            helperText={props.errors.lastName}
        />
        <TextField
            variant={"filled"}
            id={'phoneNumber'}
            name={'phoneNumber'}
            value={props.userInfo.phoneNumber}
            type="number"
            label={"شماره‌ی تماس"}
            placeholder="برای مثال: ۰۹۱۲۳۴۵۶۷۸۹"
            onChange={props.onUserInfoChangeFn}
            error={!!props.errors.phoneNumber}
            helperText={props.errors.phoneNumber}
        />
        <TextField
            variant={"filled"}
            id={'nationalId'}
            name={'nationalId'}
            value={props.userInfo.nationalId}
            type="number"
            label={"کد ملی"}
            onChange={props.onUserInfoChangeFn}
            error={!!props.errors.nationalId}
            helperText={props.errors.nationalId}
        />
        <TextField
            variant={"filled"}
            id={'address'}
            name={'address'}
            value={props.userInfo.address}
            multiline
            label={"آدرس"}
            onChange={props.onUserInfoChangeFn}
            error={!!props.errors.address}
            helperText={props.errors.address}
        />
        {/*<FormControlLabel*/}
        {/*    control={*/}
        {/*      <Checkbox*/}
        {/*          edge={"start"}*/}
        {/*          checked={props.userInfo.location.allow}*/}
        {/*          onChange={props.getLocation}*/}
        {/*          name="location"*/}
        {/*          color="primary"*/}
        {/*      />*/}
        {/*    }*/}
        {/*    label="استفاده از لوکیشن برای آدرس"*/}
        {/*/>*/}
        {!props.isMobileDisplay && <CustomButton variant={"contained"} size={"large"} onClick={props.submit}>
          ثبت‌نامم کن</CustomButton>}
      </>
  );
};

SignUpForm.propTypes = {
  isMobileDisplay: PropTypes.bool,
  submit: PropTypes.func,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    nationalId: PropTypes.string,
    address: PropTypes.string,
    location: {
      allow: PropTypes.bool,
      lat: PropTypes.string,
      long: PropTypes.string,
    },
  }),
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    nationalId: PropTypes.string,
    address: PropTypes.string,
    location: {
      allow: PropTypes.bool,
      lat: PropTypes.string,
      long: PropTypes.string,
    },
  }),
  onUserInfoChangeFn: PropTypes.func,
  // accessLocation: PropTypes.bool,
};

export default SignUpForm;