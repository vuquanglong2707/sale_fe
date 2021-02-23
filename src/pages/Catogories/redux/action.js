import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getCatogories = (params) => async dispatch => {
    const api = API.CATOGORIES.getCatogories();
    dispatch({ type: Types.GET_CATOGORIES_LOADING});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_CATOGORIES_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_CATOGORIES_FAILURE
        })
    }
  }
export const inSertCatogories = (payload, meta) => async (dispatch) => {
    const api = API.CATOGORIES.inSertCatogories();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_CATOGORIES_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_CATOGORIES_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}
export const updateCatogories = (payload, meta) =>async(dispatch) => {

    const api = API.CATOGORIES.updateCatogories();
    dispatch({ type: Types.UPDATE_CATOGORIES_LOADING });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.UPDATE_CATOGORIES_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.UPDATE_CATOGORIES_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}
export const deleteCatogories = (params, meta) => async (dispatch) => {
    dispatch({ type: Types.DELETE_CATOGORIES_LOADING });
    const api = API.CATOGORIES.deleteCatogories();
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.DELETE_CATOGORIES_SUCCESS
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.DELETE_CATOGORIES_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}
