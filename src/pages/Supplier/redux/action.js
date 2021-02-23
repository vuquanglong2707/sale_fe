import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getSupplier = (params) => async dispatch => {
    const api = API.SUPPLIER.getSupplier();
    dispatch({ type: Types.GET_SUPPLIER_LOADING});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_SUPPLIER_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_SUPPLIER_FAILURE
        })
    }
  }
export const inSertSupplier = (payload, meta) => async (dispatch) => {
    const api = API.SUPPLIER.inSertSupplier();
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
        dispatch({ type: Types.ADD_SUPPLIER_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


