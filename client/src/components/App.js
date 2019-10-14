import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import AuthRoute from './util/route_util';

import Splash from './splash/splash';
// import DashboardNav from './nav/DashboardNav';
import QuestionCreate from './questions/QuestionCreate';
import QuestionList from './questions/QuestionList';
import LessonList from './lessons/LessonList';
import LessonDetail from './lessons/LessonDetail';
import LessonEnd from './lessons/LessonEnd';
import CourseList from './courses/CourseList';
import CourseDetail from './courses/CourseDetail';
import CourseListAuth from './courses/CourseListAuth';
import ProfilePage from './profile/user_profile';
import Repl from './repl/repl';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/chooseCourse" component={CourseListAuth} />
        <Route exact path="/questions/new" component={QuestionCreate} />
        <Route exact path="/questions" component={QuestionList} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/lessons/:id" component={LessonDetail} />
        <Route exact path="/courses" component={CourseList} />
        <Route exact path="/users/:id" component={ProfilePage} />
        <Route exact path="/lessonEnd" component={LessonEnd} />
        {/* <AuthRoute exact path="/" component={DashboardNav} routeType="auth" /> */}
        <Route path="/" component={Splash} />
        <Route path="/repl" component={Repl} />
      </Switch>
    </HashRouter>
  )
}

export default App;
