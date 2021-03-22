import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';
import { makeStyles } from "@material-ui/core/styles";
import Hands from '../assets/icons/helping-hand.svg';
import { CustomButton } from "./common/CustomButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
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
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
      <>
        <HealingIcon className={classes.icon}/>
        <Typography variant="h4" className={classes.title}>
          سامانه‌ی ثبت نیازمندی‌ها
        </Typography>
        {/*<hr className={classes.hr}/>*/}
        {/*<img className={classes.image} src={Hands} alt="hands"/>*/}
        <Typography variant="span" className={classes.text}>
          در این سامانه شما می‌توانید در زمان وقوع بحران نیازهای خود را وارد کنید تا در اسرع وقت، برطرف شود.
        </Typography>
        <CustomButton className={classes.btn} variant={"contained"}>شروع ثبت نیاز</CustomButton>
      </>
  );
};

Home.propTypes = {};

export default Home;