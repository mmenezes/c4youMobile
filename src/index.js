import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/index.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/app';
import reducer from './reducers';
import HttpsRedirect from 'react-https-redirect';
import 'react-widgets/dist/css/react-widgets.css';

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(reducer), // new root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    ),
  ),
);

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);
