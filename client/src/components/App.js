import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import AuthRoute from './util/route_util';

import Login from './auth/Login';
import Register from './auth/Register';
import Splash from './splash/splash';
import SplashNav from './nav/SplashNav';
import DashboardNav from './nav/DashboardNav';

const App = () => {
  return (
    <HashRouter>
      <SplashNav />
      <Splash />
      <h1>This is Codolingo</h1>
      <Switch>
        <Route path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute path="/" component={DashboardNav} routeType="auth" />
        <Route path="/" component={Splash} />
      </Switch>
    </HashRouter>
  )
}

export default App;
