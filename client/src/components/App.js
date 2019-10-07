import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import AuthRoute from './util/route_util';

// import Login from './auth/Login';
// import Register from './auth/Register';
import Splash from './splash/splash';
// import DashboardNav from './nav/DashboardNav';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Splash />
        <Switch>
          {/* <DashboardNav /> */}
          {/* <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route path="/register" component={Register} /> */}
          {/* <Route path="/" component={Splash} /> */}
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
