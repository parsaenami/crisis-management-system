import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { TextField } from "@material-ui/core";

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
      <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          // thousandSeparator
          // isNumericString
          // allowEmptyFormatting
          format="#    #    #    #    #"
          mask={'_'}
      />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const OtpInput = props => {
  return (
      <TextField
          variant={"filled"}
          className={props.className}
          label={props.label}
          value={props.value}
          onChange={props.onChangeFn}
          onBlur={props.onBlurFn}
          name="otp-input"
          id="otp-input"
          error={props.error}
          helperText={props.errorText}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          style={{
            textAlignLast: "center",
            direction: 'ltr',
          }}
      />
  );
};

OtpInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeFn: PropTypes.func,
  onBlurFn: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

export default OtpInput;