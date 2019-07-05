import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({});

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_LOADING:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT:
    default:
      return state;
  }
}
