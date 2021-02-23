import { API } from "../../../constants/api";
import callApi from '../../../utils/apiCall';
import Types from "../../../constants/ActionTypes";

export const InsertShopInfo = (payload, meta) => async (dispatch) => {
    dispatch({ type: Types.SHOP_INFO_BY_USER_ID_LOADING })
    const api = API.SHOP_INFO.inSertShopInfo();
    const { response, error } = await callApi({ ...api, payload })
    if (!error && response.data.success === true) {
        dispatch({
            type: Types.SHOP_INFO_BY_USER_ID_SUCCESS,
            payload: response.data
        })
        if (meta && meta.onSuccess()) {
            meta.onSuccess();
        }
    } else {
        dispatch({
            type: Types.SHOP_INFO_BY_USER_ID_FAILURE
        })
        if (meta && meta.onError()) {
            meta.onError(response.data.message);
        }
    }
}

export const getShopById = () => async (dispatch) => {
    dispatch({ type: Types.SHOP_INFO_BY_USER_ID_LOADING})
    const api = API.SHOP_INFO.shopInfoById();
    const { response, error } = await callApi({ ...api })
    if (!error && response.status === 200) {
        dispatch({
            type: Types.SHOP_INFO_BY_USER_ID_SUCCESS,
            payload: response.data.data
        })
    }
    else {
        dispatch({
            type: Types.SHOP_INFO_INSERT_FAILURE
        })
    }
}