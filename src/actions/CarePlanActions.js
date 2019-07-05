import * as config from '../config';
import * as actionTypes from './actionTypes';
import CarePlanApi from '../api/CarePlanApi';
import { push } from 'connected-react-router';
import cookies from 'cookies-js';

export function getHealthTips(conditionType) {
  return function(dispatch) {
    CarePlanApi.getHealthTips(conditionType).then(response => {
      const data = response.data.result[0];
      const healthTips = data.yoga_tips.split(',');
      const randomHealthTipIndex = Math.floor(Math.random() * healthTips.length);
      cookies.set('randomHealthTipIndex', randomHealthTipIndex);
      cookies.set('randomHealthTip', healthTips[randomHealthTipIndex]);
      dispatch(getHealthTipsSuccess(data));
    }).catch(error => {
      console.log(error);
      // dispatch(loginFailure(error));
    });
  };
}

export function getHealthTipsSuccess(data) {
  return { type: actionTypes.GET_HEALTH_TIPS_SUCCESS, data: data }
}

export function getHealthTipsFailure(errorMessage) {
  return { type: actionTypes.GET_HEALTH_TIPS_FAILURE, errorMessage }
}
