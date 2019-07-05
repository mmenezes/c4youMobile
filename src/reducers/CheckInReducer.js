import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({
  isLoading: true,
  name: '',
  age: '',
  bloodGroup: '',
  condition: '',
  doctor: '',
  medication: ''
});

export default function CheckInReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_DETAILS_SUCCESS:
      return state.setIn(['name'], action.data.cust_name)
                  .setIn(['age'], action.data.age)
                  .setIn(['bloodGroup'], action.data.blood_group)
                  .setIn(['condition'], action.data.condition)
                  .setIn(['doctor'], action.data.doctor)
                  .setIn(['medication'], action.data.medication)
                  .setIn(['isLoading'], false);
    case actionTypes.CHECKIN_LOADING:
    case actionTypes.GET_CUSTOMER_DETAILS_FAILURE:
    default:
      return state;
  }
}
