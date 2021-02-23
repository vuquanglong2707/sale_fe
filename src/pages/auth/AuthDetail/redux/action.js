import callApi from '../../../../utils/apiCall';
import { API } from "../../../../constants/api";
import Types from '../../../../constants/ActionTypes';


export const getAccount = (params) => async (dispatch) => {
    dispatch({ type: Types.AUTH_ACCOUNT_LOADING })
    const api = API.ACCOUNT.accountUser();
    const { response, error } = await callApi({ ...api, params })
    if (!error && response.status === 200) {
        dispatch({
            type: Types.AUTH_ACCOUNT_SUCCESS,
            payload: response.data.data
        })
    }
    else {
        dispatch({
            type: Types.AUTH_ACCOUNT_FAILURE
        })
    }
}


export const updatedAccount = (payload,meta) => async (dispatch) => {
    dispatch({ type: Types.AUTH_ACCOUNT_LOADING })
    const api = API.ACCOUNT.updateAccount();
    const { response, error } = await callApi({ ...api, payload })
    if (!error && response.data.success === true) {
        dispatch({
          type: Types.AUTH_ACCOUNT_SUCCESS,
          payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    } else {
        dispatch({
            type: Types.AUTH_ACCOUNT_FAILURE,
            payload: response.data.message
        })
         if (meta && meta.onError) {
            meta.onError()
        }
    }

}
