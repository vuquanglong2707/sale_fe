import Types from '../../../../constants/ActionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    didInvalidate: true,
    isAuthenticated: false,
    error: '',
    accountDetails:{},
    forwardLocation: {},
})
  
const authReducer = (state = initialState, action) => {
    switch(action.type) {
      case Types.LOGGING_IN:
        return state.merge({
          isAuthenticated: false,
          isFetching: true,
          error: '',
        })
      case Types.LOG_IN_SUCCESS: {
        const { accessToken, user } = action.payload
        localStorage.setItem('jwtToken', accessToken)
        return state.merge({
          accountDetails: user,
          isAuthenticated: true,
          isFetching: false,
        })
      }        
      case Types.LOG_IN_FAILURE:
        return state.merge({
          isAuthenticated: false,
          isFetching: false,
          error: action.payload,
        })
      case Types.LOG_OUT:  
        localStorage.clear()
        return state.merge({
          isFetching: false,
          didInvalidate: true,
          isAuthenticated: false,
          error: ''
        })
      default:
          return state
    }
}

export default authReducer;
