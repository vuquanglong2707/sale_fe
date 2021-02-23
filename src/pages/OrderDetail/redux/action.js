import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getOrderDetail = (params) => async dispatch => {
    const api = API.ORDERDETAIL.getOrderDetail();
    dispatch({ type: Types.GET_ORDERDETAIL_LOADING});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_ORDERDETAIL_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_ORDERDETAIL_FAILURE
        })
    }
  }
export const  inSertOrder= (payload, meta) => async (dispatch) => {
    const api = API.ORDERDETAIL.inSertOrder();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_ORDERDETAIL_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_ORDERDETAIL_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


