import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: null,
  accessToken: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, accessToken: action.payload }
    case SIGN_OUT:
      return { ...state, isSignedIn: false, accessToken: null }
    default:
      return state
  }
}
