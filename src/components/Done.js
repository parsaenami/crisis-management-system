import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Fab from "./common/FAB";
import { routes } from "../assets/routes";
import { CustomButton } from "./common/CustomButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    '& > *': {
      textAlign: "center",
      margin: theme.spacing(1, 0),
    },
    '& > h3': {
      fontWeight: "bold",
    },
    '& > p': {
      margin: theme.spacing(3),
    },
  },
  icon: {
    fontSize: theme.spacing(10),
    color: theme.palette.primary.light,
    margin: theme.spacing(5, 0),
  },
  desktopBtn: {
    display: "flex",
    marginTop: theme.spacing(10),
    width: 400,
    '& > *': {
      flex: 1,
      margin: theme.spacing(2, 1),
      '&:first-child': {
        marginRight: theme.spacing(0),
      },
      '&:last-child': {
        marginLeft: theme.spacing(0),
      },
    },
  },
}));

const Done = () => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))

  return (
      <>
        <div className={classes.container}>
          <CheckCircleRoundedIcon className={classes.icon}/>
          <Typography gutterBottom variant={"h3"} color={"textSecondary"}>
            درخواست شما با موفقیت ثبت شد
          </Typography>
          <Typography gutterBottom color={"textSecondary"}>
            تغییر وضعیت درخواست شما از طریق پیامک اطلاع‌رسانی خواهد شد
          </Typography>
          {!isMobileDisplay && <div className={classes.desktopBtn}>
            <CustomButton variant={"contained"} onClick={() => history.push(routes.ADD_NEED)}>
              ثبت نیاز جدید
            </CustomButton>
            <CustomButton variant={"contained"} onClick={() => history.push(routes.PROFILE)}>
              پیگیری درخواست‌ها
            </CustomButton>
          </div>}
        </div>
        {isMobileDisplay && <Fab buttons={[
          {
            title: 'ثبت نیاز جدید',
            onClickFn: () => history.push(routes.ADD_NEED),
          },
          {
            title: 'پیگیری درخواست‌ها',
            onClickFn: () => history.push(routes.PROFILE),
          },
        ]}/>}
      </>
  );
};

Done.propTypes = {};

export default Done;