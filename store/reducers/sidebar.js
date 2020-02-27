import * as actionTypes from '../actions/actionTypes'

const initialState = {
  open: true,
  // type: 'temporary',
  type: 'persistent',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIDE_BAR_OPEN:
      return {
        ...state,
        open: true,
      }
    case actionTypes.SIDE_BAR_CLOSED:
      return {
        ...state,
        open: false,
      }
    case actionTypes.SIDE_BAR_CHANGE_TYPE:
      return {
        ...state,
        type: action.type,
      }
    default:
      return state
  }
}

export default reducer
