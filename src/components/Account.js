import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import classnames from 'classnames';
import { Button, MuiThemeProvider, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import RTL from "../helpers/RTL";
import Theme from "../helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "./buttons/FAB";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";
import OtpForm from "./forms/OtpForm";
import { emptyUserInfo, UserInfoType } from '../types/userInfoType'
import { usePosition } from "../hooks/usePosition";
import { messages } from "../assets/messages";
import { routes } from "../assets/routes";
import FloatingAlert from "./common/FloatingAlert";
import { useAlert } from "../hooks/useAlert";
import Popup from "./common/Popup";
import { Context } from "../Context";
import Helmet from 'react-helmet';
import { api, config, get_token, rest, set_token } from "../helpers/api";
import Loader from "./common/Loader";

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

const objectCheckEmpty = obj => {
  return Object.values(obj).join('') === ''
}

const Account = props => {
  const theme = useTheme();
  const {context, setContext} = useContext(Context)
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState({otp: false, account: false});
  const [permission, setPermission] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isRegister, setIsRegister] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const classes = useStyles({...props, breakpoint: isMobileDisplay, isOtp});
  const history = useHistory();
  const {open, message, type, duration, closeAlert, showAlert} = useAlert();

  // otpForm state
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [countdown, setCountdown] = useState(30);
  // sign-in/sign-up states
  const [signInWithNid, setSignInWithNid] = useState(false);
  const [userInfo, setUserInfo] = useState(emptyUserInfo);
  const [userInfoError, setUserInfoError] = useState(emptyUserInfo);

  useEffect(() => {
    if (get_token()) {
      history.push(routes.PROFILE)
    }
    setPageLoading(false)
  }, [])

  useEffect(() => {
    setContext(isOtp ? 'تأیید شماره‌ی تماس' : isRegister ? 'ثبت‌نام' : 'ورود')
  }, [setContext, isOtp, isRegister])

  useEffect(() => setDialogOpen(true), [])
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

  const sendOtp = (code) => {
    setCountdown(30)
    setTimeout(() => {
      showAlert("کد شما: " + code, "success", 8000)
    }, 4000)
  }

  const sendOtpAgain = () => {
    setCountdown(30)
    api.patch(rest.getOtp, {}, config("json"))
        .then((res) => {
          setTimeout(() => {
            showAlert("کد شما: " + res.data.otp.code, "success", 8000)
          }, 4000)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
  }

  const checkError = () => {
    const errors = {
      fn: !userInfo.firstName.length ? messages.ERR_EMPTY : '',
      ln: !userInfo.lastName.length ? messages.ERR_EMPTY : '',
      pn: !userInfo.phoneNumber.length
          ? messages.ERR_EMPTY
          : !(userInfo.phoneNumber.startsWith('09') || userInfo.phoneNumber.startsWith('+989'))
              ? messages.ERR_WRONG_PHONE
              : '',
      ni: !userInfo.nationalId.length
          ? messages.ERR_EMPTY
          : userInfo.nationalId.length !== 10
              ? messages.ERR_WRONG_NID_LENGTH
              : '',
      ad: !userInfo.address.length ? messages.ERR_EMPTY : '',
    }

    if (isRegister) {
      setUserInfoError({
        ...userInfoError,
        firstName: errors.fn,
        lastName: errors.ln,
        phoneNumber: errors.pn,
        nationalId: errors.ni,
        address: errors.ad,
      })
    } else {
      const errMsg = signInWithNid ? errors.ni : errors.pn;

      setUserInfoError({
        ...userInfoError,
        [signInWithNid ? 'nationalId' : 'phoneNumber']: errMsg,
      })
    }

    return !objectCheckEmpty(isRegister
        ? errors
        : {[signInWithNid ? 'nationalId' : 'phoneNumber']: signInWithNid ? errors.ni : errors.pn})
  }

  const submit = e => {
    e.preventDefault();
    const signInMethod = signInWithNid ? userInfo.nationalId : userInfo.phoneNumber;
    let data = {};

    console.log('error:', checkError())

    if (!checkError()) {
      setLoading({...loading, account: true})
      if (isRegister) {
        data = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phoneNumber: userInfo.phoneNumber,
          nationalId: userInfo.nationalId,
          address: userInfo.address,
          locationAccess: permission,
          lat: latitude,
          long: longitude,
        }
      } else {
        data = {
          [signInWithNid ? 'nationalId' : 'phoneNumber']: signInMethod,
        }
      }

      api.post(isRegister ? rest.signUp : rest.signIn, data, config('json'))
          .then((res) => {
            showAlert(res.data.msg, "success", 3000);
            setIsOtp(true);
            sendOtp(res.data.otp.code)
          })
          .catch((err) => {
            showAlert(err.response.data.error, "error", 3000);
          })
          .finally(() => setLoading({...loading, account: false}))
    }
  }

  const verify = e => {
    e.preventDefault();

    if (code.length < 5) {
      setCodeError(messages.ERR_SHORT_OTP)
    } else {
      setLoading({...loading, otp: true})
      const infoType = !isRegister && signInWithNid
      const infoTemp = infoType ? userInfo.nationalId : userInfo.phoneNumber
      api.get(`${rest.verify}/${infoType}/${infoTemp}/${code}`)
          .then((res) => {
            set_token(res.data.token)
            showAlert(res.data.msg, "success", 5000);
            history.push(routes.PROFILE)
          })
          .catch((err) => {
            showAlert(err.response.data.error, "error", 3000);
          })
          .finally(() => setLoading({...loading, otp: false}))
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
        loading={loading.otp}
    />
    <Button variant={"text"} color={"primary"} onClick={sendOtpAgain} disabled={countdown > 0}>
      {countdown > 0 ? `ارسال مجدد کد بعد از ${countdown} ثانیه` : 'ارسال مجدد'}
    </Button>
  </div>

  return pageLoading ? <Loader/> : (
      <RTL>
        <MuiThemeProvider theme={Theme}>
          <Helmet><title>{isOtp ? 'تأیید شماره‌ی تماس' : isRegister ? 'ثبت‌نام' : 'ورود'}</title></Helmet>
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
                          loading={loading.account}
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
                          loading={loading.account}
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

          <Popup
              open={dialogOpen}
              onClose={handleDialogClose(false)}
              onDeny={handleDialogClose(false)}
              onConfirm={handleDialogClose(true)}
              title={'اجازه‌ی دسترسی به موقعیت مکانی'}
              text={messages.INFO_ALLOW_LOCATION}
              denyBtn={'فعلاً نه'}
              confirmBtn={'قبول'}
          />

          {isMobileDisplay && <Fab buttons={[
            {
              loading: isOtp ? loading.otp : loading.account,
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