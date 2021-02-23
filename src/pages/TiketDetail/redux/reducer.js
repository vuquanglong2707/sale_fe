
import { fromJS } from "immutable";
import Types from '../../../constants/ActionTypes';
import { findIndex } from "../../../utils/findIndex";

const importTiketState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const importTiketReducer = (state = importTiketState, action) => {
    switch (action.type) {

        case Types.GET_IMPORTTIKET_LOADING:
            return state.set('isFetching', true)
        
        case Types.GET_IMPORTTIKET_SUCCESS:
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
        // case Types.UPDATE_CATOGORIES_SUCCESS:
        //     const items = state.get('items')
        //     const { id, active } = action.payload
        //     const index = findIndex(items, id)
        //     items[index].active = active
        //     return state.merge({
        //         items: [...items],
        //         isFetching: false,
        //         didInvalidate: false,
        //     })
        // case Types.DELETE_CATOGORIES_SUCCESS:
        // case Types.UPDATE_CATOGORIES_FAILURE:
        case Types.GET_CATOGORIES_BYID_FAILURE:
        // case Types.DELETE_CATOGORIES_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
      default:
          return state
    }
}



  

export default importTiketReducer;
