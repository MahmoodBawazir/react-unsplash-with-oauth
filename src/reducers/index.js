import { combineReducers } from 'redux'

import authReducer from './authReducer'
import photoReducer from './photoReducer'
import userReducer from './userReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  auth: authReducer,
  photos: photoReducer,
  user: userReducer,
  form: formReducer
})
