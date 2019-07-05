import * as config from '../config';
import * as actionTypes from './actionTypes';
import CheckInApi from '../api/CheckInApi';
import { push } from 'connected-react-router';
import cookies from 'cookies-js';

export function getCustomerDetails(username) {
  return function(dispatch) {
    CheckInApi.getCustomerDetails(username).then(response => {
      const data = response.data.result[0];
      cookies.set('name', data.cust_name);
      cookies.set('conditionType', data.condition);
      dispatch(getCustomerDetailsSuccess(data));
    }).catch(error => {
      console.log(error);
      // dispatch(loginFailure(error));
    });
  };
}

export function getCustomerDetailsSuccess(data) {
  return { type: actionTypes.GET_CUSTOMER_DETAILS_SUCCESS, data: data }
}

export function getCustomerDetailsFailure(errorMessage) {
  return { type: actionTypes.GET_CUSTOMER_DETAILS_FAILURE, errorMessage }
}

export function checkIn(name, medications, orderDate) {
  return function(dispatch) {
    CheckInApi.checkIn(name, medications, orderDate).then(response => {
      dispatch(checkInSuccess());
      dispatch(push(config.DOCUMENT_ROOT + 'care-plan'));
    }).catch(error => {
      console.log(error);
      // dispatch(loginFailure(error));
    });
  };
}

export function checkInSuccess(data) {
  return { type: actionTypes.CHECKIN_SUCCESS }
}

export function checkInFailure(errorMessage) {
  return { type: actionTypes.CHECKIN_FAILURE, errorMessage }
}
