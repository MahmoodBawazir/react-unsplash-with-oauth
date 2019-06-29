import {
  REQUEST_RANDOM_PHOTOS,
  RECEIVE_RANDOM_PHOTOS,
  REQUEST_SEARCH_PHOTOS,
  RECEIVE_SEARCH_PHOTOS,
  CLEAR_PHOTOS,
  ERROR_RECEIVE_PHOTOS
} from '../actions/types'

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SEARCH_PHOTOS:
      return { ...state, isFetching: true }
    case RECEIVE_SEARCH_PHOTOS:
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.payload.results],
        total: action.payload.total,
        totalPages: action.payload.total_pages
      }
    case REQUEST_RANDOM_PHOTOS:
      return { ...state, isFetching: true }
    case RECEIVE_RANDOM_PHOTOS:
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.payload]
      }
    case ERROR_RECEIVE_PHOTOS:
      return { ...state, isFetching: false, error: true }
    case CLEAR_PHOTOS:
      return { data: action.payload }
    default:
      return state
  }
}
