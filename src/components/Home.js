import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton } from "./buttons/CustomButton";
import Hands from "../assets/icons/helping-hand2.svg"
import { NavLink } from "react-router-dom";
import { routes } from "../assets/routes";
import { api, get_token, rest } from "../helpers/api";
import { Context } from "../Context";
import AccessDenied from "./common/AccessDenied";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // background: '#91DDEC',
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
      // justifyContent: "flex-start",
      alignItems: "flex-start",
      flexBasis: "50%",
    }
    // background: '#91DDEC',
  },
  icon: {
    fontSize: theme.spacing(8),
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  h4: {
    textAlign: "center",
    fontSize: theme.spacing(5),
    fontWeight: 800,
    color: theme.palette.text.secondary,
  },
  h6: {
    textAlign: "center",
    color: theme.palette.text.light,
    fontWeight: 400
  },
  image: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    margin: theme.spacing(1, 0),
    // filter: "contrast(0.8)",
    flexBasis: "40%",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
    '&#small': {
      width: theme.spacing(8),
      maxHeight: theme.spacing(8),
      display: "block",
      [theme.breakpoints.up('md')]: {
        display: "none",
      },
    }
  },
  hr: {
    color: theme.palette.text.secondary,
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(2.5),
    textAlign: "center",
    textAlignLast: "center",
    margin: theme.spacing(6, 0),
    [theme.breakpoints.up('md')]: {
      textAlign: "right",
      textAlignLast: "right",
    },
  },
  btnContainer: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
  btn: {
    width: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = '#91DDEC';
    document.getElementsByTagName("header")[0].style.backgroundColor = '#91DDEC';
    return () => {
      document.getElementsByTagName("body")[0].style.backgroundColor = '#F5F2EB';
      document.getElementsByTagName("header")[0].style.backgroundColor = '#FDFFFA';
    }
  }, []);

  useEffect(() => {
    api.get(`/${get_token()}`)
        .then((res) => {
          if (!res.data.status) {
            localStorage.removeItem('token')
          }
        })
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    if (get_token()) {
      history.push(routes.ADD_NEED)
    } else {
      setOpen(true);
    }
  };

  return (
      <div className={classes.root}>
        <div className={classes.content}>
          <img className={classes.image} id={'small'} src={Hands} alt="hands"/>
          <Typography gutterBottom variant="h4" className={classes.h4}>
            سیمرغ
          </Typography>
          <Typography variant="h6" className={classes.h6}>
            سامانه‌ی یکپارچه‌ی مدیریت رویدادهای غیرمترقبه
          </Typography>
          <Typography component="span" className={classes.text}>
            در این سامانه شما می‌توانید در زمان وقوع بحران نیازهای خود را وارد کنید تا در اسرع وقت، برطرف شود.
          </Typography>
          {get_token() ?  <NavLink to={routes.ADD_NEED} className={classes.btnContainer}>
            <CustomButton className={classes.btn} variant={"contained"} size={"large"}>ثبت نیاز</CustomButton>
          </NavLink> : <div onClick={handleDialogOpen} className={classes.btnContainer}>
            <CustomButton className={classes.btn} variant={"contained"} size={"large"}>ثبت نیاز</CustomButton>
          </div>}
        </div>
        <img className={classes.image} src={Hands} alt="hands"/>
        <AccessDenied open={open} handleClose={handleClose} action={() => history.push(routes.ADD_NEED)}/>
      </div>
  );
};

Home.propTypes = {};

export default Home;