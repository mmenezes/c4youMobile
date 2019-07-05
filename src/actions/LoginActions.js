import * as config from '../config';
import * as actionTypes from './actionTypes';
import LoginApi from '../api/LoginApi';
import { push } from 'connected-react-router';
import cookies from 'cookies-js';

export function login(username, password) {
  return function(dispatch) {
    LoginApi.login(username, password).then(response => {
      cookies.set('username', username);
      dispatch(loginSuccess());
      dispatch(push(config.DOCUMENT_ROOT + 'check-in'));
    }).catch(error => {
      console.log(error);
      // dispatch(loginFailure(error));
    });
  };
}

export function loginSuccess() {
  return { type: actionTypes.LOGIN_SUCCESS }
}

export function loginFailure(errorMessage) {
  return { type: actionTypes.LOGIN_FAILURE, errorMessage }
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutSuccess());
    dispatch(push(config.DOCUMENT_ROOT + 'login'));
  }
}

export function logoutSuccess() {
  return { type: actionTypes.LOGOUT }
}
