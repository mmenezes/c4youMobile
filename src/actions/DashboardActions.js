import * as config from '../config';
import * as actionTypes from './actionTypes';
import DashboardApi from '../api/DashboardApi';
import { push } from 'connected-react-router';

export function addLogReadings(name, type, value, remarks) {
  return function(dispatch) {
    DashboardApi.addLogReadings(name, type, value, remarks).then(response => {
      dispatch(addLogReadingsSuccess());
    }).catch(error => {
      console.log(error);
      // dispatch(loginFailure(error));
    });
  };
}

export function addLogReadingsSuccess() {
  return { type: actionTypes.ADD_LOG_READINGS_SUCCESS }
}

export function addLogReadingsFailure(errorMessage) {
  return { type: actionTypes.ADD_LOG_READINGS_FAILURE, errorMessage }
}
