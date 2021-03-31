import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography } from "@material-ui/core";
import { CustomButton } from "./buttons/CustomButton";
import { routes } from "../assets/routes";
import Logo404 from "../assets/icons/error (1).svg";
import Helmet from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    '& > img': {
      width: theme.spacing(40),
      maxWidth: '70%',
    },
    '& > h5': {
      textAlign: "center",
      fontWeight: "bold",
      margin: theme.spacing(5, 0),
    },
  },
}));

const NotFound = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
      <div className={classes.container}>
        <Helmet><title>۴۰۴</title></Helmet>
        <img src={Logo404} alt={'404'}/>
        <Typography gutterBottom variant={"h5"}>
          متأسفانه این‌جا چیزی نیست :(
        </Typography>
        <CustomButton variant={"contained"} onClick={() => history.push(routes.HOME)}>
          بازگشت به صفحه‌ی اصلی
        </CustomButton>
      </div>
  );
};

NotFound.propTypes = {};

export default NotFound;