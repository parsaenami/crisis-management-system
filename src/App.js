// @flow

import './App.scss';
import { Route, Router, Switch } from 'react-router-dom';
import Home from "./components/Home";
import { createBrowserHistory } from 'history';
import Header from "./components/common/Header";
import { Container, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import Theme from "./components/helpers/Theme";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "./assets/routes";
import SignIn from "./components/SignIn";
import About from "./components/About";

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    paddingTop: theme.spacing(9),
    // border: "1px solid red"
  },
}));

function App() {
  const classes = useStyles();

  return (
      <Router history={history}>
        <MuiThemeProvider theme={Theme}>
          {/*<div>*/}
            <CssBaseline/>
            <Header/>
            <Container maxWidth="lg" className={classes.root}>
              <Switch>
                <Route exact path={routes.HOME} component={Home}/>
                <Route exact path={routes.SIGN_IN} component={SignIn}/>
                <Route exact path={routes.ABOUT} component={About}/>
              </Switch>
            </Container>
          {/*</div>*/}
        </MuiThemeProvider>
      </Router>
  );
}

export default App;
