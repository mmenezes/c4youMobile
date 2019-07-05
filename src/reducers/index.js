import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import CheckInReducer from './CheckInReducer';
import CarePlanReducer from './CarePlanReducer';
import DashboardReducer from './DashboardReducer';
import * as actionTypes from '../actions/actionTypes';

const appReducer = combineReducers({
  LoginReducer,
  CheckInReducer,
  CarePlanReducer,
  DashboardReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
