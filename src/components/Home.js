import React, { useEffect } from 'react';
import { SvgIcon, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton } from "./common/CustomButton";
import Hands from "../assets/icons/helping-hand (1).svg"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
      justifyContent: "flex-start",
      alignItems: "flex-end",
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
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: theme.spacing(1, 0),
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
  },
  btn: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
}));

function HandIcon(props) {
  return null
  return (
      <SvgIcon component={Hands} viewBox="0 0 600 476.6" {...props} />
  );
}

const Home = props => {
  const classes = useStyles();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = '#91DDEC';
    return () => document.getElementsByTagName("body")[0].style.backgroundColor = '#F5F2EB';
  }, []);

  return (
      <div className={classes.root}>
        <HealingIcon className={classes.icon}/>
        <Typography variant="h4" className={classes.title}>
          سامانه‌ی ثبت نیازمندی‌ها
        </Typography>
        {/*<hr className={classes.hr}/>*/}
        {/*<img className={classes.image} src={Hands} alt="hands"/>*/}
        {/*<HandIcon />*/}
        <Typography component="span" className={classes.text}>
          در این سامانه شما می‌توانید در زمان وقوع بحران نیازهای خود را وارد کنید تا در اسرع وقت، برطرف شود.
        </Typography>
        <CustomButton className={classes.btn} variant={"contained"}>شروع ثبت نیاز</CustomButton>
      </div>
  );
};

Home.propTypes = {};

export default Home;