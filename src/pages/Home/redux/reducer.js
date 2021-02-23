import Types from '../../../constants/ActionTypes';
import { fromJS } from 'immutable';

const shopInfoState = fromJS({
  isFetching: false,
  error: "",
  shopInfoDetails: {}
});

const shopInfoReducer = (state = shopInfoState, action) => {
  switch (action.type) {
    // case Types.SHOP_INFO_LOADING:
    //   return state.set('isFetching', true);
    case Types.SHOP_INFO_INSERT_SUCCESS:
        return state.merge({
          isFetching: false,
            error: "",
            shopInfoDetails: action.payload
        })      
    case Types.SHOP_INFO_INSERT_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.payload,
      })
    case Types.SHOP_INFO_BY_USER_ID_LOADING:
      return state.set('isFetching', true);
    case Types.SHOP_INFO_BY_USER_ID_SUCCESS:
      // localStorage.setItem("shop", action.payload.id);
      return state.merge({
        isFetching: false,
        shopInfoDetails: action.payload
      }) 
    case Types.SHOP_INFO_BY_USER_ID_FAILURE: 
      return state.merge({
        isFetching: false,
        error: action.payload ,
      })
    default:
      return state
  }
}

export default shopInfoReducer;
