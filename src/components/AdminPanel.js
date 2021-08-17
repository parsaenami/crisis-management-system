import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { AppBar, Box, makeStyles, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 600,
  },
  tab: {
    flex: 1,
  },
}));

const AdminPanel = () => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="full width tabs"
        >
          <Tab className={classes.tab} label="داشبورد" {...a11yProps(0)} />
          <Tab className={classes.tab} label="کاربران" {...a11yProps(1)} />
          <Tab className={classes.tab} label="درخواست‌ها" {...a11yProps(2)} />
          <Tab className={classes.tab} label="نیازها" {...a11yProps(3)} />
          <Tab className={classes.tab} label="حوادث" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Item Five
        </TabPanel>
    </div>
  );
};

export default AdminPanel;