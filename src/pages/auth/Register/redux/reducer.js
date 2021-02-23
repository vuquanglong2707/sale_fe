import Types from '../../../../constants/ActionTypes';
import { fromJS } from 'immutable';

const registerState = fromJS({
    isFetching: false,
    error: false,
  })
const registerReducer = (state = registerState, action) => {
    switch(action.type) {
      case Types.AUTH_REGISTER_SUCCESS:
        return state.merge({
          isFetching: true,
          error: false,
        })      
      case Types.AUTH_REGISTER_FAILURE:
        return state.merge({
          isFetching: false,
          error: true,
        })
      default:
          return state
    }
}

export default registerReducer;
