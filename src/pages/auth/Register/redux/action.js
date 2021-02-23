import callApi from '../../../../utils/apiCall';
import { API } from "../../../../constants/api";
import Types from '../../../../constants/ActionTypes';


export const registerUser = (payload, meta) => async (dispatch) => {
    const api = API.AUTH.reginster()
    const { response, error } = await callApi({ ...api, payload })
    if (!error && response.status === 200) {
      if(response && response.data.success !== false){
          dispatch({ type: Types.AUTH_REGISTER_SUCCESS })
          if (meta && meta.onSuccess) {
            meta.onSuccess()
          }
      }
      else {
          dispatch({ type: Types.AUTH_REGISTER_FAILURE })
          if (meta && meta.onError) {
            meta.onError(response.data.msg)
          }
      }
    } else {
        dispatch({ type: Types.AUTH_REGISTER_FAILURE })
        if (meta && meta.onError) {
            meta.onError(response.data.msg)
          }
    }

}
