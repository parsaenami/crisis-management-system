import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Grid, makeStyles, MobileStepper, Paper, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Swipe } from "react-swipe-component"
import { disasterCategories, needCategories } from "../../assets/categories";

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
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
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

  // useEffect(() => {
  //   console.log(12)
  //   setActiveStep(props.current)
  // }, [props])

  const printValues = (cat, val) => {
    if (cat === "category") {
      return needCategories[val.toString()].faName
    } else if (cat === "title") {
      return needCategories[props.receipts[activeStep].category.toString()].items[val]
    } else if (cat === "urgent") {
      switch (val) {
        case 1:
          return 'خیلی کم'
        case 2:
          return 'کم'
        default:
        case 3:
          return 'متوسط'
        case 4:
          return 'زیاد'
        case 5:
          return 'خیلی زیاد'
      }
    }
    return val
  }

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
          <Typography>{`درخواست ${activeStep + 1}`}</Typography>
        </Paper>
        <Swipe
            nodeName="div"
            onSwipedLeft={onSwipeLeftListener}
            onSwipedRight={onSwipeRightListener}
            detectTouch
        >
          <div className={classes.body}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Paper className={classes.key} elevation={0}>نوع حادثه</Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper className={classes.value}
                       elevation={0}>{disasterCategories[props.type] ? disasterCategories[props.type] : '-'}</Paper>
              </Grid>
              {Object.keys(props.receipts[activeStep]).map((need, i) => (<>
                <Grid key={i + 1} item xs={5}>
                  <Paper className={classes.key} elevation={0}>{translate[need]}</Paper>
                </Grid>
                <Grid key={-i} item xs={7}>
                  <Paper className={classes.value} elevation={0}>
                    {props.receipts[activeStep][need] !== "" ? printValues(need, props.receipts[activeStep][need]) : '-'}
                  </Paper>
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
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  current: PropTypes.number,
  receipts: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        title: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        amount: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        urgent: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        desc: PropTypes.string,
      })
  )
};

Receipt.defaultProps = {
  type: '-',
  receipts: [
    {
      category: '-',
      title: '-',
      amount: '-',
      urgent: '-',
      desc: '-',
    },
  ],
}

export default Receipt;