// @flow

import './App.scss';
import { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import { createBrowserHistory } from 'history';
import { Container, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helmet from 'react-helmet';
import Theme from "./helpers/Theme";
import { Context, UserContext } from "./Context";
import Header from "./components/common/Header";
import Home from "./components/Home";
import Account from "./components/Account";
import About from "./components/About";
import Profile from "./components/Profile";
import AddNeed from "./components/AddNeed";
import Done from "./components/Done";
import NotFound from "./components/NotFound";
import { routes } from "./assets/routes";
import Footer from "./components/common/Footer";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminPanel from "./components/AdminPanel";

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
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <HttpsRedirect>
      <BrowserRouter>
        <UserContext.Provider value={{isAdmin, setIsAdmin}}>
          <Context.Provider value={{context, setContext}}>
            <MuiThemeProvider theme={Theme}>
              <CssBaseline/>
              <Helmet defaultTitle="سیمرغ" titleTemplate="سیمرغ | %s"/>
              <Container maxWidth="lg" className={classes.root} id="app">
                <Route path={routes.HOME} component={Header}/>
                <Switch>
                  <Route exact path={routes.HOME} component={Home}/>
                  <Route path={routes.SIGN_IN} component={Account}/>
                  <Route path={routes.ABOUT} component={About}/>
                  <PrivateRoute path={routes.PROFILE} component={Profile}/>
                  <PrivateRoute path={routes.ADD_NEED} component={AddNeed}/>
                  <PrivateRoute path={routes.DONE} component={Done}/>
                  <PrivateRoute path={routes.ADMIN} component={AdminPanel}/>
                  <Route exact path={'*'} component={NotFound}/>
                </Switch>
                <Footer className="footer"/>
              </Container>
            </MuiThemeProvider>
          </Context.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </HttpsRedirect>
  );
};

export default App;
