// @flow

import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import { createBrowserHistory } from 'history';
import Header from "./components/common/Header";
import { Container, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import Theme from "./helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "./assets/routes";
import Account from "./components/Account";
import About from "./components/About";
import Profile from "./components/Profile";
import AddNeed from "./components/AddNeed";
import Done from "./components/Done";

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    paddingTop: theme.spacing(9),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
      <BrowserRouter history={history}>
        <MuiThemeProvider theme={Theme}>
          <CssBaseline/>
          <Switch>
            <Container maxWidth="lg" className={classes.root}>
              <Route path={routes.HOME} component={Header}/>
              <Route exact path={routes.HOME} component={Home}/>
              <Route exact path={routes.SIGN_IN} component={Account}/>
              <Route exact path={routes.ABOUT} component={About}/>
              <Route exact path={routes.PROFILE} component={Profile}/>
              <Route exact path={routes.ADD_NEED} component={AddNeed}/>
              <Route exact path={routes.DONE} component={Done}/>
            </Container>
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
  );
};

export default App;
