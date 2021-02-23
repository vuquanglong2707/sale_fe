
import Types from '../../../constants/ActionTypes';
import { fromJS } from "immutable";

import { findIndex } from "../../../utils/findIndex";

const productState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const productReducer = (state = productState, action) => {
    switch (action.type) {
        case Types.UPDATE_PRODUCT_LOADING:
        case Types.GET_CATOGORIES_LOADING:    
        case Types.GET_PRODUCT_OF_SHOP_LOADING:
        // case Types.DELETE_USERSYSTEM:
            return state.set('isFetching', true)
        case Types.GET_CATOGORIES_SUCCESS:
        case Types.GET_PRODUCT_OF_SHOP_SUCCESS:
            const { data, metaData } = action.payload
            return state.merge({
                items: data,
                meta: {
                  current: metaData.page,
                  pageSize: metaData.size,
                  total: metaData.total,
                },
                isFetching: false,
                didInvalidate: false,
            }) 
        case Types.DELETE_PRODUCT_SUCCESS:
        case Types.UPDATE_PRODUCT_SUCCESS:
            const items = state.get('items')
            const { id, active } = action.payload
            const index = findIndex(items, id)
            items[index].active = active
            return state.merge({
                items: [...items],
                isFetching: false,
                didInvalidate: false,
            })
        
        case Types.DELETE_PRODUCT_FAILURE:
        case Types.UPDATE_PRODUCT_FAILURE:    
        case Types.GET_CATOGORIES_FAILURE:
        case Types.GET_PRODUCT_OF_SHOP_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
        // case Types.ADD_SERVICESHOP_SUCCESS:
        //     return state.merge({
        //         isFetching: false,
        //         didInvalidate: false,
        //     })
      default:
          return state
    }
}

export default productReducer;
