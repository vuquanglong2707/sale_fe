import { fromJS } from 'immutable';
import Types  from '../../../constants/ActionTypes';


const initialState = fromJS({
    currentPage: [''],
    openKey: [''],
  })
  
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
    case Types.SET_PAGE:
      return state.merge({ currentPage: [action.payload] })
  
    case Types.SET_OPEN_KEY:
      return state.merge({ openKey: [action.payload] })
    default:
      return state
    }
  }


export default appReducer;
