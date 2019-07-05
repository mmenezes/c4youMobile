import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({
  isLoading: true,
  plan: ''
});

export default function CarePlanReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_HEALTH_TIPS_SUCCESS:
      return state.setIn(['tipsDiet'], action.data.tips_diet)
                  .setIn(['tipsLifestyle'], action.data.tips_lifestyle)
                  .setIn(['tipsYoga'], action.data.yoga_tips)
                  .setIn(['isLoading'], false);
    case actionTypes.CARE_PLAN_LOADING:
    case actionTypes.GET_HEALTH_TIPS_FAILURE:
    default:
      return state;
  }
}
