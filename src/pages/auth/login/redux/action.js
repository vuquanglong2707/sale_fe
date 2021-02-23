import  Types from '../../../../constants/ActionTypes';
import callApi from '../../../../utils/apiCall';
import { API } from '../../../../constants/api';
import select from '../../../../utils/select';

export const loginUser = (payload) => async (dispatch) => {
  const api = API.AUTH.login()
  dispatch({ type: Types.LOGGING_IN })
  const { response, error } = await callApi({ ...api, payload })
  if (!error && response.status === 200) {
      dispatch({
        type: Types.LOG_IN_SUCCESS,
        payload: response.data
      })
  } else {
    dispatch({
      type: Types.LOG_IN_FAILURE,
      payload: "Đăng nhập thất bại!!! tài khoản hoặc mật khẩu không đúng"
    })
  }
}


export const logoutUser = (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('shop');
    return  (dispatch) => {
        dispatch({
            type: Types.LOG_OUT
        });
     }
}


export const loginWithToken = () => async (dispatch) => {
  const api = API.AUTH.loginWithToken();
  dispatch({ type: Types.LOGGING_IN })
  const { response, error } = await callApi({ ...api })
  if (!error && response.status === 200) {
    if (response.data && response.data !== null) {
      dispatch({
        type: Types.LOG_IN_SUCCESS,
        payload: response.data
      })
    } else {
      dispatch({
        type: Types.LOG_IN_FAILURE
      })
    }
  } else {
    
      dispatch({
        type: Types.LOG_IN_FAILURE
      })
    // }
  }
}
  
  export const loginWithTokenIfNeed = () => (dispatch, getState) => {
    const state = getState()
    const isFetching = select(state, 'authReducer', 'isFetching')
    const isAuthenticated = select(state, 'authReducer', 'isAuthenticated')
      const jwtToken = localStorage.getItem('jwtToken')
    if (!isFetching && !isAuthenticated && jwtToken !== undefined) {
      dispatch(loginWithToken())
    }
  }
