import React from 'react';
import PropTypes from 'prop-types';
import { Chip, makeStyles, Typography } from "@material-ui/core";
import Card from "./card/Card";
import CardSlider from "./card/CardSlider";
import { CustomButton } from "./buttons/CustomButton";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(9),
  },
  wrapper: {
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(.5),
    color: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, 0),
    width: 'calc(100vw - 32px)',
    maxWidth: theme.spacing(56.25),
  },
  suggestionCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: "100%",
  },
  btn: {
    width: "100%",
  },
}));

const RecentNeeds = props => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography>
        اخیراً در حوادث اطراف شما اقلام زیر درخواست شده‌اند:
      </Typography>
      {Object.keys(props.requests).map((req, i) => (
        <div className={classes.wrapper}>
          <span>{req}</span>
          <CardSlider>
            {props.requests[req].slice(0, 4).map((item, k) => (
              <Card
                k={k}
                onClick={() => {
                  props.close()
                  props.select(item.category.id, item.need.id, item.disaster.en_title)
                }}
              >
                <div className={classes.suggestionCard}>
                  <Chip
                    label={item.category.title}
                    color={"primary"}
                    size={"small"}
                    style={{fontSize: 10}}
                  />
                  <div className={"text-center"}>{item.need.title}</div>
                </div>
              </Card>
            ))}
          </CardSlider>
        </div>
      ))}
      <CustomButton variant={"contained"} onClick={props.close} className={classes.btn}>رد کردن</CustomButton>
    </div>
  );
};

RecentNeeds.propTypes = {
  requests: PropTypes.object,
  select: PropTypes.func,
};

export default RecentNeeds;