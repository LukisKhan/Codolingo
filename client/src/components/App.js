import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import AuthRoute from './util/route_util';

import Login from './auth/Login';
import Register from './auth/Register';
import Splash from './splash/splash';
import SplashNav from './nav/SplashNav';
import DashboardNav from './nav/DashboardNav';
import Question from './questions/question';
import QuestionList from './questions/QuestionList';

const App = () => {
  return (
    <HashRouter>
      {/* <SplashNav /> */}
      {/* <Splash /> */}
      <h1>This is Codolingo</h1>
      <Switch>
        {/* <DashboardNav /> */}
        {/* <AuthRoute path="/login" component={Login} routeType="auth" /> */}
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/question/list" component={QuestionList} />
        <Route path="/question" component={Question} />
        {/* <Route path="/" component={Splash} /> */}
      </Switch>
    </HashRouter>
  )
}

export default App;
