import React, { useEffect } from 'react';
import { SvgIcon, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton } from "./common/CustomButton";
import Hands from "../assets/icons/helping-hand2.svg"
import SvgHelpingHand1 from "../assets/icons/SvgHelpingHand1";
import { NavLink } from "react-router-dom";
import { routes } from "../assets/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row-reverse",
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
      alignItems: "flex-end",
      flexBasis: "50%",
    }
    // background: '#91DDEC',
  },
  icon: {
    fontSize: theme.spacing(8),
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: "center",
    fontSize: theme.spacing(5),
    fontWeight: "bold",
    color: theme.palette.text.secondary,
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

const Home = props => {
  const classes = useStyles();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = '#91DDEC';
    document.getElementsByTagName("header")[0].style.backgroundColor = '#91DDEC';
    return () => {
      document.getElementsByTagName("body")[0].style.backgroundColor = '#F5F2EB';
      document.getElementsByTagName("header")[0].style.backgroundColor = '#FDFFFA';
    }
  }, []);

  return (
      <div className={classes.root}>
        <div className={classes.content}>
          <img className={classes.image} id={'small'} src={Hands} alt="hands"/>
          <Typography variant="h4" className={classes.title}>
            سامانه‌ی ثبت نیازمندی‌ها
          </Typography>
          <Typography component="span" className={classes.text}>
            در این سامانه شما می‌توانید در زمان وقوع بحران نیازهای خود را وارد کنید تا در اسرع وقت، برطرف شود.
          </Typography>
          <NavLink to={routes.ADD_NEED} className={classes.btnContainer}>
            <CustomButton className={classes.btn} variant={"contained"} size={"large"}>ثبت نیاز</CustomButton>
          </NavLink>
        </div>
        <img className={classes.image} src={Hands} alt="hands"/>
      </div>
  );
};

Home.propTypes = {};

export default Home;