import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import AuthRoute from './util/route_util';

import Login from './auth/Login';
import Register from './auth/Register';
import Splash from './splash/splash';
import SplashNav from './nav/SplashNav';
import DashboardNav from './nav/DashboardNav';
import QuestionCreate from './questions/QuestionCreate';
import QuestionList from './questions/QuestionList';
import LessonList from './lessons/LessonList';
import LessonDetail from './lessons/LessonDetail';
import Repl from './repl/repl';

const App = () => {
  return (
    <HashRouter>
      {/* <SplashNav /> */}
      {/* <Splash /> */}
      <Switch>
        <Route path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route exact path="/questions/new" component={QuestionCreate} />
        <Route exact path="/questions" component={QuestionList} />
        <Route exact path="/lessons" component={LessonList} />
        <Route exact path="/lessons/:id" component={LessonDetail} />
        {/* <AuthRoute exact path="/" component={DashboardNav} routeType="auth" /> */}
        {/* <Route path="/" component={Splash} /> */}
        <Route path="/repl" component={Repl} />
        
      </Switch>
    </HashRouter>
  )
}

export default App;
