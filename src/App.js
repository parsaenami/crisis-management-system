// @flow

import './App.scss';
import { Route, Router, Switch } from 'react-router-dom';
import Home from "./components/Home";
import { createBrowserHistory } from 'history';
import Header from "./components/common/Header";
import { Container, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import RTL from "./components/helpers/RTL";
import Theme from "./components/helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import styles from './App.scss';
import classNames from 'classnames';

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


function App(props) {
  const classes = useStyles();

  return (
      <Router history={history}>
        <MuiThemeProvider theme={Theme}>
          <div>
            <CssBaseline/>
            <Header/>
            <Container maxWidth="lg" className={classes.root}>
              <Switch>
                <Route path={'/'} component={Home}/>
              </Switch>
            </Container>
          </div>
        </MuiThemeProvider>
      </Router>
  );
}

export default App;
