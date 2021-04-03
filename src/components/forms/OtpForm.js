import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from "@material-ui/core";
import OtpInput from "../common/OtpInput";
import { CustomButton } from "../buttons/CustomButton";

const OtpForm = props => {
  return (
      <>
        <Typography gutterBottom color={"textSecondary"}>
          برای ادامه دادن، کد پنج رقمی ارسال شده به شماره‌ی تماس خود را وارد نمایید.
        </Typography>
        <OtpInput
            label={"کد تأیید"}
            value={props.code}
            onChangeFn={props.handleChange}
            onBlurFn={props.onBlur}
            error={!!props.error}
            errorText={props.error}
        />
        {!props.isMobileDisplay &&
        <CustomButton variant={"contained"} size={"large"} onClick={props.submit}>
          {props.loading ? <CircularProgress size={26}/> : 'تأیید'}
        </CustomButton>}
      </>
  );
};

OtpForm.propTypes = {
  isMobileDisplay: PropTypes.bool,
  loading: PropTypes.bool,
  code: PropTypes.string,
  submit: PropTypes.func,
  handleChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};

export default OtpForm;