import unsplash from '../api/unsplash'
import {
  SIGN_IN,
  SIGN_OUT,
  REQUEST_RANDOM_PHOTOS,
  RECEIVE_RANDOM_PHOTOS,
  REQUEST_SEARCH_PHOTOS,
  RECEIVE_SEARCH_PHOTOS,
  CLEAR_PHOTOS,
  REQUEST_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  ERROR_RECEIVE_USER,
  REQUEST_USER,
  RECEIVE_USER,
  PUT_EDIT_USER,
  REQUEST_EDIT_USER,
  ERROR_RECEIVE_PHOTOS
} from './types'

export const signIn = accessToken => {
  return {
    type: SIGN_IN,
    payload: accessToken
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const clearPhotos = () => {
  return {
    type: CLEAR_PHOTOS,
    payload: []
  }
}

export const fetchSearchPhotos = (query, page) => async dispatch => {
  dispatch({ type: REQUEST_SEARCH_PHOTOS })
  try {
    const response = await unsplash.get('/search/photos', {
      params: { query, page }
    })

    dispatch({ type: RECEIVE_SEARCH_PHOTOS, payload: response.data })
  } catch (err) {
    dispatch({ type: ERROR_RECEIVE_PHOTOS })
  }
}

export const fetchRandomPhotos = count => async dispatch => {
  dispatch({ type: REQUEST_RANDOM_PHOTOS })
  try {
    const response = await unsplash.get('/photos/random', {
      params: { count }
    })

    dispatch({ type: RECEIVE_RANDOM_PHOTOS, payload: response.data })
  } catch (err) {
    dispatch({ type: ERROR_RECEIVE_PHOTOS })
  }
}

export const fetchCurrentUser = () => async dispatch => {
  dispatch({ type: REQUEST_CURRENT_USER })

  try {
    const response = await unsplash.get('/me')

    dispatch({ type: RECEIVE_CURRENT_USER, payload: response.data })
  } catch (err) {
    dispatch({ type: ERROR_RECEIVE_USER })
  }
}

export const editCurrentUser = formValues => async dispatch => {
  dispatch({ type: REQUEST_EDIT_USER })

  try {
    const response = await unsplash.put('/me', formValues)

    dispatch({ type: PUT_EDIT_USER, payload: response.data })
  } catch (err) {
    console.log(err)
  }
}

export const fetchUser = username => async dispatch => {
  dispatch({ type: REQUEST_USER })

  try {
    const response = await unsplash.get(`/users/${username}`)

    dispatch({ type: RECEIVE_USER, payload: response.data })
  } catch (err) {
    console.log(err)
  }
}
