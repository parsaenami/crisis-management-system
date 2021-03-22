import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox,
  FilledInput, FormControlLabel,
  InputLabel,
  MuiThemeProvider,
  TextField,
  Typography,
  withMobileDialog
} from "@material-ui/core";
import RTL from "./helpers/RTL";
import Theme from "./helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import { usePosition } from "../hooks/usePosition";
import Fab from "./common/FAB";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    '& > *': {
      direction: 'rtl',
      margin: theme.spacing(1, 0)
    },
  },
  title: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  input: {
    // backgroundColor: theme.palette.secondary.light,
    borderRadius: "4px 4px 0 0",
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
}));

const SignIn = props => {
  const classes = useStyles();
  const {latitude, longitude, error} = usePosition();
  const [isRegister, setIsRegister] = useState(true);

  const registerForm = () => <>
    <TextField variant={"filled"} className={classes.input} label={"نام"}/>
    <TextField variant={"filled"} className={classes.input} label={"نام خانوادگی"}/>
    <TextField variant={"filled"} type="number" className={classes.input} label={"شماره‌ی تماس"} placeholder="برای مثال: ۰۹۱۲۳۴۵۶۷۸۹"/>
    <TextField variant={"filled"} multiline className={classes.input} label={"آدرس"}/>
    <FormControlLabel
        className={classes.input}
        control={
          <Checkbox
              edge={"start"}
              // checked={state.checkedB}
              // onChange={handleChange}
              name="location"
              color="primary"
          />
        }
        label="استفاده از لوکیشن برای آدرس"
    />
  </>;

  const signInForm = () => <>
    <TextField variant={"filled"} type="number" className={classes.input} label={"شماره‌ی تماس"}/>
  </>;

  return (
      <RTL>
        <MuiThemeProvider theme={Theme}>
          <div className={classes.title}>
            <Typography variant={"h3"}>{isRegister ? 'ثبت‌نام' : 'ورود'}</Typography>
            <Button variant={"outlined"} size={"small"} onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'ورود' : 'ثبت‌نام'}</Button>
          </div>
          <hr/>
          <form className={classes.container}>
            {isRegister ? registerForm() : signInForm()}
          </form>
          <Fab buttons={[
            {
              title: isRegister ? 'ثبت‌نامم کن' : 'وارد شو',
              onClickFn: () => {
              },
            }
          ]}/>
        </MuiThemeProvider>
      </RTL>
  );
};

SignIn.propTypes = {};

export default SignIn;