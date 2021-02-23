import Types from '../../../../constants/ActionTypes';
import { fromJS } from 'immutable';

const registerState = fromJS({
    isFetching: false,
    error: "",
    accountDetails: {}
})
  
const authDetailReducer = (state = registerState, action) => {
  switch (action.type) {
    case Types.AUTH_ACCOUNT_LOADING:
      return state.set('isFetching', true);
    case Types.AUTH_ACCOUNT_SUCCESS:
      return state.merge({
        isFetching: false,
        accountDetails: action.payload
      })      
    case Types.AUTH_ACCOUNT_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.payload ,
      })
    default:
      return state
  }
}



export default authDetailReducer;
