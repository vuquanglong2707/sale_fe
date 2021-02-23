import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";


export const getProductOfShop = (params) => async (dispatch) => {
    
    dispatch({ type: Types.GET_PRODUCT_OF_SHOP_LOADING})
    const api = API.PRODUCTS.getProductOfShop();
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        dispatch({
            type: Types.GET_PRODUCT_OF_SHOP_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_PRODUCT_OF_SHOP_FAILURE
        })
    }
  }
export const getAll = () => async (dispatch) => {
    dispatch({ type: Types.GET_CATOGORIES_LOADING})
    const api = API.CATOGORIES.getAll();
    const { response, error } = await callApi({ ...api })
    if (!error && response.status === 200) {
        dispatch({
            type: Types.GET_CATOGORIES_SUCCESS,
            payload: response.data.data
        })
    }
    else {
        dispatch({
            type: Types.GET_CATOGORIES_FAILURE
        })
    }
}

//   export const updateStatus = (payload, meta) => async (dispatch) => {
//     const api = API.USERSYSTEM.updateStatus();
//     dispatch({ type: Types.UPDATTING_STATUS_USERSYSTEM });
//     const { response, error } = await callApi({ ...api, payload });
//     if(!error && response.status === 200 && response.data.success === true) {
//         dispatch({
//             type: Types.CHANGE_STATUS_USERSYSTEM_SUCCESS,
//             payload: response.data.data
//         })
//         if (meta && meta.onSuccess) {
//             meta.onSuccess()
//         }
//     }
//     else {
//         dispatch({ type: Types.CHANGE_STATUS_USERSYSTEM_FAILURE })
//         if (meta && meta.onError) {
//             meta.onError()
//         }
//     }
// }

export const inSertProduct = (payload, meta) => async (dispatch) => {
    const api = API.PRODUCTS.inSertProduct();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_PRODUCT_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_PRODUCT_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


export const updateProduct = (payload, meta) =>async(dispatch) => {

    const api = API.PRODUCTS.updateProduct();
    dispatch({ type: Types.UPDATE_PRODUCT_LOADING });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.UPDATE_PRODUCT_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.UPDATE_PRODUCT_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}

export const deleteProduct = (params, meta) => async (dispatch) => {
    dispatch({ type: Types.DELETE_PRODUCT_LOADING });
    const api = API.PRODUCTS.deleteProduct();
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.DELETE_USERSYSTEM_SUCCESS
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.DELETE_USERSYSTEM_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}
