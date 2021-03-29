// @flow

import './App.scss';
import { BrowserRouter, HashRouter, Redirect, Route, Router } from 'react-router-dom';
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
import { Context } from "./Context";
import { useState } from "react";
import NotFound from "./components/NotFound";

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
  const [context, setContext] = useState("default");

  return (
      <Context.Provider value={{context, setContext}}>
        <MuiThemeProvider theme={Theme}>
          <CssBaseline/>
          <Container maxWidth="lg" className={classes.root} id="app">
            <HashRouter>
              <Route path={routes.HOME} component={Header}/>
              <Route exact path={routes.HOME} component={Home}/>
              <Route path={routes.SIGN_IN} component={Account}/>
              <Route path={routes.ABOUT} component={About}/>
              <Route path={routes.PROFILE} component={Profile}/>
              <Route path={routes.ADD_NEED} component={AddNeed}/>
              <Route path={routes.DONE} component={Done}/>
              <Route path={routes.NOT_FOUND} component={NotFound}/>

              <Redirect
                  to={{
                    pathname: routes.NOT_FOUND,
                  }}
              />
            </HashRouter>
          </Container>
        </MuiThemeProvider>
      </Context.Provider>
  );
};

export default App;
