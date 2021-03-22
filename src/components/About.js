import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  title: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
}));

const About = props => {
  const classes = useStyles();

  return (
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant={"h3"}>درباره‌ی ما</Typography>
        </div>
        <hr/>
      </div>
  );
};

About.propTypes = {};

export default About;