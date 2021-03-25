import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Grid, makeStyles, MobileStepper, Paper, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Swipe } from "react-swipe-component"

const translate = {
  type: 'حادثه',
  category: 'نوع نیاز',
  title: 'عنوان نیاز',
  amount: 'تعداد',
  urgent: 'ضرورت',
  desc: 'توضیحات',
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0 0 4px 1px #707070aa",
    borderRadius: theme.spacing(.5),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingRight: theme.spacing(2),
    borderBottom: "1px solid #707070",
    borderRadius: theme.spacing(.5, .5, 0, 0),
    backgroundColor: theme.palette.secondary.light,
  },
  body: {
    padding: theme.spacing(2, 0),
  },
  key: {
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    padding: theme.spacing(.5, 2),
  },
  value: {
    color: theme.palette.text.hint,
    backgroundColor: "transparent",
    padding: theme.spacing(.5, 2),
  },
  footer: {
    borderRadius: theme.spacing(0, 0, .5, .5),
    borderTop: "1px solid #707070",
    backgroundColor: theme.palette.secondary.light,
  },
}));

const Receipt = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.receipts.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSwipeLeftListener = () => {
    setActiveStep(activeStep > 0 ? activeStep - 1 : maxSteps - 1);
  }
  const onSwipeRightListener = () => {
    setActiveStep(activeStep < maxSteps - 1 ? activeStep + 1 : 0);
  }

  return (
      <div className={classnames(classes.root, props.className)}>
        <Paper elevation={0} className={classes.header}>
          <Typography>{props.receipts[activeStep].label}</Typography>
        </Paper>
        <Swipe
            nodeName="div"
            onSwipedLeft={onSwipeLeftListener}
            onSwipedRight={onSwipeRightListener}
            detectTouch
        >
          <div className={classes.body}>
            <Grid container spacing={1}>
              {Object.keys(props.receipts[activeStep]).slice(1).map(need => (<>
                <Grid item xs={5}>
                  <Paper className={classes.key} elevation={0}>{translate[need]}</Paper>
                </Grid>
                <Grid item xs={7}>
                  <Paper className={classes.value} elevation={0}>{props.receipts[activeStep][need]}</Paper>
                </Grid>
              </>))}
            </Grid>
          </div>
        </Swipe>
        <MobileStepper
            steps={maxSteps}
            className={classes.footer}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                بعدی
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                قبلی
              </Button>
            }
        />
      </div>
  );
};

Receipt.propTypes = {
  className: PropTypes.string,
  receipts: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        category: PropTypes.string,
        title: PropTypes.string,
        amount: PropTypes.string,
        urgent: PropTypes.string,
        desc: PropTypes.string,
      })
  )
};

Receipt.defaultProps = {
  receipts: [
    {
      label: 'درخواست ۱',
      type: 'زلزله',
      category: 'لوازم گرمایشی',
      title: 'هیتر برقی',
      amount: '۲',
      urgent: 'زیاد',
      desc: 'ما اینجا خیلی داریم یخ می‌زنیم. اینجا بسیار هوا سرد است و ما هیتر برقی نداریم و بسیار لازم داریم تا آن را روشن کنیم و گرم شویم.',
    },
    {
      label: 'درخواست ۲',
      type: 'زلزله',
      category: 'مواد غذایی',
      title: 'کیک',
      amount: '۱۰',
      urgent: 'کم',
      desc: 'ما اینجا خیلی داریم گشنگی می‌کشیم. اینجا بسیار غذا کم است و ما کیک نداریم و بسیار لازم داریم تا آن را بخوریم و سیر شویم.',
    },
    {
      label: 'درخواست ۳',
      type: 'زلزله',
      category: 'افلام پزشکی',
      title: 'چسب زخم',
      amount: '۲۰',
      urgent: 'خیلی زیاد',
      desc: 'ما اینجا خیلی داریم زخم می‌شویم. اینجا بسیار موانع تیز موجود است و ما هی به آن‌ها می‌خوریم و زخم می‌شویم بسیار لازم داریم تا روی آن چسب زخم بزنیم تا خوب شویم.',
    },
  ],
}

export default Receipt;