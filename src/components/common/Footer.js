import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    width: theme.spacing(30),
    padding: theme.spacing(1, 2),
    color: theme.palette.text.hint,
    '& > p': {
      textAlign: "center",
      fontSize: theme.spacing(1.5),
    },
  },
}));

const Footer = props => {
  const classes = useStyles()

  return (
      <footer className={classnames(classes.footer, props.className)}>
        <Typography gutterBottom>
          تمامی حقوق این سایت متعلق به <a href="https://linkedin.com/in/parsaenami" target="_blank"
                                          rel="noreferrer">پارسا انعامی</a> است. © ۱۴۰۰
        </Typography>
      </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;