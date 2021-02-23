
import { fromJS } from "immutable";
import Types from '../../../constants/ActionTypes';
import { findIndex } from "../../../utils/findIndex";

const orderDetailState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const orderDetailReducer = (state = orderDetailState, action) => {
    switch (action.type) {

        case Types.GET_ORDERDETAIL_LOADING:
            return state.set('isFetching', true)
        
        case Types.GET_ORDERDETAIL_SUCCESS:
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
        case Types.GET_ORDERDETAIL_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
      default:
          return state
    }
}



  

export default orderDetailReducer;
