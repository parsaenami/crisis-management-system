import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, makeStyles, Tab, Tabs, useTheme } from "@material-ui/core";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Requests from "./admin/Requests";
import Needs from "./admin/Needs";
import { Context } from "../Context";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{paddingTop: 24}}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
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

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  tab: {
    flex: 1,
    maxWidth: 'unset',
  },
}));

const AdminPanel = () => {
  const classes = useStyles()
  const theme = useTheme()
  const {setContext} = useContext(Context)

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setContext('پنل ادمین')
  }, [setContext])

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
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Users/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Requests/>
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <Needs/>
      </TabPanel>
    </div>
  );
};

export default AdminPanel;