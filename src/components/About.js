import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant={"h3"}>درباره‌ی ما</Typography>
        </div>
        <hr/>
        <Typography gutterBottom color={"textSecondary"}>
          همواره در زمان وقوع بحران‌هایی مانند سیل، زلزله، آتش‌سوزی و... و بخصوص پس از آن، مهم‌ترین اقدامی که باید صورت
          گیرد، عملیات امداد و کمک‌رسانی به بازماندگان و همچنین نجات‌یافتگان حادثه است.
        </Typography>
        <Typography gutterBottom color={"textSecondary"}>
          در شرایطی که به دلایل مختلف امکان تأخیر در دریافت کمک و یا عدم تطابق کمک‌های دریافتی با نیازهای واقعی موجود
          باشد، این سامانه می‌تواند با جمع‌آوری و دسته‌بندی نیازهای افراد آسیب‌دیده، فرآیند امدادرسانی به این دسته از
          افراد را تسریع بخشیده و کارآمدتر کند.
        </Typography>
      </div>
  );
};

About.propTypes = {};

export default About;