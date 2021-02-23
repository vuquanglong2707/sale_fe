import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getCustomer = (params) => async dispatch => {
    const api = API.CUSTOMER.getCustomer();
    dispatch({ type: Types.GET_CUSTOMER_FAILURE});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_CUSTOMER_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_CUSTOMER_FAILURE
        })
    }
  }
export const inSertCustomer = (payload, meta) => async (dispatch) => {
    const api = API.CUSTOMER.inSertCustomer();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_CUSTOMER_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_CUSTOMER_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


