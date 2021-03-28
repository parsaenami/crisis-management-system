import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import classnames from 'classnames';
import {
  Button,
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  MuiThemeProvider,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import RTL from "../helpers/RTL";
import Theme from "../helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "./common/FAB";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import OtpForm from "./OtpForm";
import { emptyUserInfo, UserInfoType } from '../types/userInfoType'
import { usePosition } from "../hooks/usePosition";
import { messages } from "../assets/messages";
import { routes } from "../assets/routes";
import FloatingAlert from "./common/FloatingAlert";
import { useAlert } from "../hooks/useAlert";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    paddingBottom: theme.spacing(9),
    [theme.breakpoints.up('md')]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    '& hr': {
      transform: "rotate(90deg)",
      alignSelf: "center",
      maxWidth: theme.spacing(32.5),
    },
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    '& > *': {
      direction: 'rtl',
      margin: theme.spacing(1, 0),
      width: 400,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      }
    },
  },
  blurForm: {
    transition: "ease .3s",
    filter: props => !props.breakpoint && props.isOtp ? "blur(3px)" : "",
  },
  blurOtp: {
    transition: "ease .3s",
    filter: props => !props.breakpoint && !props.isOtp ? "blur(3px)" : "",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.4,
    zIndex: 999,
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    fontSize: theme.spacing(4),
    margin: theme.spacing(2, 0),
    color: theme.palette.text.light,
    position: "absolute",
    top: 0,
    right: "50%",
    transform: "translate(45%, -50%)",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Account = props => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const [permission, setPermission] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isRegister, setIsRegister] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const classes = useStyles({...props, breakpoint: isMobileDisplay, isOtp});
  const history = useHistory();
  const {open, message, type, duration, closeAlert, showAlert} = useAlert();

  // otpForm state
  const [code, setCode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [countdown, setCountdown] = useState(30);
  // sign-in/sign-up states
  const [signInWithNid, setSignInWithNid] = useState(false);
  const [userInfo: UserInfoType, setUserInfo] = useState(emptyUserInfo);
  const [userInfoError: UserInfoType, setUserInfoError] = useState(emptyUserInfo);

  useEffect(() => setDialogOpen(true), [])
  // useEffect(() => setX(window.confirm(messages.INFO_ALLOW_LOCATION)), [])
  const {latitude, longitude, error} = usePosition(permission);

  useEffect(() => {
    if (isOtp && countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000)
    }

    return clearTimeout()
  }, [isOtp, countdown])

  const handleDialogClose = confirmed => () => {
    setPermission(confirmed)
    setDialogOpen(false);
  };

  const handleCodeChange = e => {
    setCode(e.target.value);

    if (e.target.value === '') {
      setCodeError(messages.ERR_EMPTY)
    } else {
      setCodeError('')
    }
  }

  const sendOtp = () => {
    setCountdown(30)
    setTimeout(() => {
      const otpRandom = Math.round(Math.random() * 100000).toString().padStart(5, "0")
      setOtpCode(otpRandom)
      showAlert("کد شما: " + otpRandom, "success", 8000)
    }, 4000)
  }

  const submit = e => {
    e.preventDefault();
    const method = signInWithNid ? userInfo.nationalId : userInfo.phoneNumber;

    if (!method.length) {
      if (isRegister) {
        setUserInfoError({
          ...userInfoError,
          firstName: userInfo.firstName.length ? '' : messages.ERR_EMPTY,
          lastName: userInfo.lastName.length ? '' : messages.ERR_EMPTY,
          phoneNumber: userInfo.phoneNumber.length ? '' : messages.ERR_EMPTY,
          nationalId: userInfo.nationalId.length ? '' : messages.ERR_EMPTY,
          address: userInfo.address.length ? '' : messages.ERR_EMPTY,
        })
      } else {
        setUserInfoError({
          ...userInfoError,
          [signInWithNid ? 'nationalId' : 'phoneNumber']: messages.ERR_EMPTY,
        })
      }
    } else {
      if (isRegister) {
        setUserInfo({
          ...userInfo,
          location: {
            allow: permission,
            lat: !error ? latitude : '',
            long: !error ? longitude : '',
          }
        })
      }
      showAlert(`کد تأیید برای کاربر با ${(signInWithNid ? 'کد ملی' : 'شماره‌ی تماس')} ${method} ارسال شد.`, "success", 3000);
      console.log({...userInfo, locationAccess: permission});
      setIsOtp(true);
      sendOtp()
    }
  }

  const verify = e => {
    e.preventDefault();

    if (code.length < 5) {
      setCodeError(messages.ERR_SHORT_OTP)
    } else if (code !== otpCode) {
      setCodeError(messages.ERR_WRONG_OTP)
    } else {
      showAlert(messages.INFO_CORRECT_OTP, "success", 5000, () => () => history.push(routes.PROFILE));
    }
  }

  const handleSignIn = e => {
    setUserInfo({
      ...userInfo,
      [signInWithNid ? 'nationalId' : 'phoneNumber']: e.target.value
    });
    setUserInfoError({
      ...userInfoError,
      [signInWithNid ? 'nationalId' : 'phoneNumber']: e.target.value === '' ? messages.ERR_EMPTY : '',
    })
  }

  const handleSignUp = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    setUserInfoError({
      ...userInfoError,
      [e.target.name]: e.target.value === '' ? messages.ERR_EMPTY : '',
    })
  }

  // const getLocation = e => {
  //   setUserInfo({
  //     ...userInfo,
  //     location: {
  //       allow: e.target.checked,
  //       lat: e.target.checked && !error ? latitude : '',
  //       long: e.target.checked && !error ? longitude : '',
  //     }
  //   })
  // }

  const handleToggle = () => {
    setIsRegister(!isRegister)
    setUserInfoError(emptyUserInfo)
  }

  const otpForm = () => <div className={classnames(classes.container, classes.blurOtp)}>
    {!isMobileDisplay && !isOtp && <div className={classes.overlay}/>}
    <OtpForm
        isMobileDisplay={isMobileDisplay}
        code={code}
        handleChange={handleCodeChange}
        submit={verify}
        error={codeError}
    />
    <Button variant={"text"} color={"primary"} onClick={sendOtp} disabled={countdown > 0}>
      {countdown > 0 ? `ارسال مجدد کد بعد از ${countdown} ثانیه` : 'ارسال مجدد'}
    </Button>
  </div>

  return (
      <RTL>
        <MuiThemeProvider theme={Theme}>
          <div className={classes.title}>
            <Typography variant={"h3"}>{isOtp ? 'تأیید شماره‌ی تماس' : isRegister ? 'ثبت‌نام' : 'ورود'}</Typography>
            {!isOtp &&
            <Button
                variant={"outlined"}
                size={"small"}
                onClick={handleToggle}
            >
              {isRegister ? 'ورود' : 'ثبت‌نام'}
            </Button>}
          </div>
          <hr/>
          <div className={classes.media}>
            <form className={classnames(classes.container, classes.blurForm)} onSubmit={isOtp ? verify : submit}>
              {!isMobileDisplay && isOtp && <div className={classes.overlay}/>}
              {isMobileDisplay && isOtp
                  ? otpForm()
                  : isRegister
                      ? <SignUpForm
                          isMobileDisplay={isMobileDisplay}
                          submit={submit}
                          userInfo={userInfo}
                          errors={userInfoError}
                          onUserInfoChangeFn={handleSignUp}
                          // accessLocation={x}
                      />
                      : <SignInForm
                          isMobileDisplay={isMobileDisplay}
                          submit={submit}
                          type={signInWithNid}
                          userNumber={signInWithNid ? userInfo.nationalId : userInfo.phoneNumber}
                          onUserNumberChangeFn={handleSignIn}
                          setType={e => setSignInWithNid(e.target.checked)}
                          error={signInWithNid ? userInfoError.nationalId : userInfoError.phoneNumber}
                      />
              }
            </form>
            {!isMobileDisplay && <>
              <div className={"position-relative w-100 align-self-center"}>
                <hr style={{borderWidth: 2}}/>
                <ArrowBackIosRoundedIcon className={classes.icon}/>
              </div>
              {otpForm()}
            </>}

          </div>

          <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">اجازه‌ی دسترسی به موقعیت مکانی</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {messages.INFO_ALLOW_LOCATION}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose(false)} color="primary">
                فعلاً نه
              </Button>
              <Button variant={"contained"} onClick={handleDialogClose(true)} color="primary" autoFocus>
                قبول
              </Button>
            </DialogActions>
          </Dialog>

          {isMobileDisplay && <Fab buttons={[
            {
              title: isOtp ? 'تأیید' : isRegister ? 'ثبت‌نامم کن' : 'ورود به حساب کاربری',
              onClickFn: isOtp ? verify : submit,
            }
          ]}/>}

          <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
        </MuiThemeProvider>
      </RTL>
  );
};

Account.propTypes = {};

export default Account;