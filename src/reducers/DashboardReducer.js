import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({});

export default function CarePlanReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
