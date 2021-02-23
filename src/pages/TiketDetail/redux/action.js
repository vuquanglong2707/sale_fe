import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getTiketDetail = (params) => async dispatch => {
    const api = API.IMPORTTIKETDETAIL.getTiketDetail();
    dispatch({ type: Types.GET_IMPORTTIKET_LOADING});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_IMPORTTIKET_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_IMPORTTIKET_FAILURE
        })
    }
  }
export const inSertTiketDetail = (payload, meta) => async (dispatch) => {
    const api = API.IMPORTTIKETDETAIL.inSertTiketDetail();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_IMPORTTIKET_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_IMPORTTIKET_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


