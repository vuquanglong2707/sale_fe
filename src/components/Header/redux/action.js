import Types from "../../../constants/ActionTypes"

export const setPage = payload => ({
    type: Types.SET_PAGE,
    payload,
  })
  
  export const setOpenKey = payload => ({
    type: Types.SET_OPEN_KEY,
    payload,
  })
