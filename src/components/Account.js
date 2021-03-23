import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, MuiThemeProvider, Typography, useMediaQuery, useTheme, withMobileDialog } from "@material-ui/core";
import RTL from "./helpers/RTL";
import Theme from "./helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "./common/FAB";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import OtpForm from "./OtpForm";
import { emptyUserInfo, UserInfoType } from '../types/userInfoType'
import { usePosition } from "../hooks/usePosition";
import { messages } from "../assets/messages";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    paddingBottom: theme.spacing(9),
    [theme.breakpoints.up('md')]: {
      display: "flex",
      flexDirection: "row-reverse",
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
    flexDirection: "row-reverse",
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
  const {latitude, longitude, error} = usePosition();
  const [isRegister, setIsRegister] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const classes = useStyles({...props, breakpoint: isMobileDisplay, isOtp});

  // otpForm state
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  // sign-in/sign-up states
  const [signInWithNid, setSignInWithNid] = useState(false);
  const [userInfo: UserInfoType, setUserInfo] = useState(emptyUserInfo);
  const [userInfoError: UserInfoType, setUserInfoError] = useState(emptyUserInfo);

  const handleCodeChange = e => {
    setCode(e.target.value);

    if (e.target.value === '') {
      setCodeError(messages.ERR_EMPTY)
    } else {
      setCodeError('')
    }
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
      alert(`کد تأیید برای کاربر  شماره‌ی تماس / کد ملی ${method} ارسال شد.`);
      console.log(userInfo);
      setIsOtp(true);
    }
  }

  const verify = e => {
    e.preventDefault();

    if (code.length < 5) {
      setCodeError(messages.ERR_SHORT_OTP)
    } else {
      alert(code)
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

  const getLocation = e => {
    setUserInfo({
      ...userInfo,
      location: {
        allow: e.target.checked,
        lat: e.target.checked && !error ? latitude : '',
        long: e.target.checked && !error ? longitude : '',
      }
    })
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
                onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'ورود' : 'ثبت‌نام'}
            </Button>}
          </div>
          <hr/>
          <div className={classes.media}>
            <form className={classnames(classes.container, classes.blurForm)}>
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
                          getLocation={getLocation}
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
                <hr/>
                <ArrowBackIosRoundedIcon className={classes.icon}/>
              </div>
              {otpForm()}
            </>}

          </div>
          {isMobileDisplay && <Fab buttons={[
            {
              title: isOtp ? 'تأیید' : isRegister ? 'ثبت‌نامم کن' : 'ورود به حساب کاربری',
              onClickFn: isOtp ? verify : submit,
            }
          ]}/>}
        </MuiThemeProvider>
      </RTL>
  );
};

Account.propTypes = {};

export default Account;