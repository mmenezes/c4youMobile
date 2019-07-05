import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import * as config from '../config';
import _ from 'lodash';
import SplashScreen from './SplashScreen';
import Login from './Login';
import CheckIn from './CheckIn';
import CarePlan from './CarePlan';
import Dashboard from './Dashboard';
import NoMatch from './NoMatch';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path={config.DOCUMENT_ROOT} component={Login} />
          <Route path={config.DOCUMENT_ROOT + 'login'} component={Login} />
          <Route path={config.DOCUMENT_ROOT + 'check-in'} component={CheckIn} />
          <Route path={config.DOCUMENT_ROOT + 'care-plan'} component={CarePlan} />
          <Route path={config.DOCUMENT_ROOT + 'dashboard'} component={Dashboard} />
          <Redirect from='/' to={config.DOCUMENT_ROOT} />
          <Route component={NoMatch} />
        </Switch>
    </ConnectedRouter>
  );
};

export default App;
