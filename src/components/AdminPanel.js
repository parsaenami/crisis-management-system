import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const AdminPanel = () => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      admin
    </div>
  );
};

export default AdminPanel;