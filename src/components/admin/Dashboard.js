import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { api, config, rest } from "../../helpers/api";
import { useAlert } from "../../hooks/useAlert";
import FloatingAlert from "../common/FloatingAlert";
import Loader from "../common/Loader";
import { makeStyles, Typography } from "@material-ui/core";
import CardSlider from "../card/CardSlider";
import DataChart from "../common/DataChart";
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    flexDirection: "row",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",

    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    },
  },
  numbers: {
    background: theme.palette.common.white,
    padding: theme.spacing(3, 2),
    boxShadow: "0 0 8px 1px #00000052",
    borderRadius: theme.spacing(.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(1),
    width: "calc(100% / 5)",
    minWidth: theme.spacing(18.75),

    '&:first-child': {
      marginRight: theme.spacing(.5),
    },

    '&:last-child': {
      marginLeft: theme.spacing(.5),
    },
  },
  number: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.light,
  },
  title: {
    textAlign: "center",
  },
  chart: {
    background: theme.palette.common.white,
    padding: theme.spacing(1),
    boxShadow: "0 0 8px 1px #00000052",
    borderRadius: theme.spacing(.5),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "calc(50% - 8px)",
    // minWidth: theme.spacing(18.75),

    '& $title': {
      margin: theme.spacing(-1, -1, 1),
      borderRadius: theme.spacing(.5, .5, 0, 0),
      padding: theme.spacing(.5),
      backgroundColor: theme.palette.info.main,
    },

    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  flex1: {
    flex: 1,
    width: '100%',
  }
}));

const Dashboard = props => {
  const classes = useStyles()
  const {open, message, type, duration, closeAlert, showAlert} = useAlert();

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(rest.admin.dashboard, config("json"))
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        showAlert(err.response.data.error, "error", 3000);
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    loading ? <Loader/> : <div className={classes.container}>
      <div className={classes.top}>
        <CardSlider>
          <div className={classes.numbers}>
            <Typography className={classes.number}>{data.users}</Typography>
            <Typography className={classes.title}>کل کاربران</Typography>
          </div>
          <div className={classes.numbers}>
            <Typography className={classes.number}>{data.requests?.total}</Typography>
            <Typography className={classes.title}>کل درخواست‌ها</Typography>
          </div>
          <div className={classes.numbers}>
            <Typography className={classes.number}>{data.recent_requests}</Typography>
            <Typography className={classes.title}>درخواست‌های ۲۴ ساعت اخیر</Typography>
          </div>
          <div className={classes.numbers}>
            <Typography className={classes.number}>{data.recent_disasters?.total}</Typography>
            <Typography className={classes.title}>حوادث ۳۰ روز اخیر</Typography>
          </div>
          <div className={classes.numbers}>
            <Typography className={classes.number}>{data.processed_requests}</Typography>
            <Typography className={classes.title}>کل درخواست‌های پردازش‌شده</Typography>
          </div>
        </CardSlider>
      </div>
      <div className={classes.bottom}>
        <div className={classes.chart}>
            <Typography className={classes.title}>پراکندگی دسته‌بندی‌های درخواست‌ها</Typography>
          <DataChart type={"pie"} data={data.requests?.data} label={'تعداد درخواست‌ها'}/>
        </div>
        <div className={classes.chart}>
            <Typography className={classes.title}>درخواست‌های دریافت‌شده به تفکیک حادثه</Typography>
          <DataChart type={"bar"} data={data.recent_disasters?.data} label={'تعداد درخواست‌ها'}/>
        </div>
        <div className={classnames(classes.chart, classes.flex1)}>
            <Typography className={classes.title}>تعداد نیازهای درخواست‌شده</Typography>
          <DataChart type={"bar"} data={data.needs_amount} label={'تعداد درخواست‌ها'}/>
        </div>
      </div>

      <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;