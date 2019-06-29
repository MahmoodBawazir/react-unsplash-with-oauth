import {
  REQUEST_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_EDIT_USER,
  PUT_EDIT_USER,
  ERROR_RECEIVE_USER
} from '../actions/types'

const INITIAL_STATE = {
  isFetching: false,
  data: {},
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CURRENT_USER:
    case REQUEST_USER:
      return { ...state, isFetching: true }
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      return { ...state, isFetching: false, data: action.payload }
    case ERROR_RECEIVE_USER:
      return { ...state, isFetching: false, error: true }
    case REQUEST_EDIT_USER:
      return { ...state }
    case PUT_EDIT_USER:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
