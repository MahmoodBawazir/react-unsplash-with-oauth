import axios from 'axios'

import { API_URL } from '../constants'
import AuthService from '../Services/AuthService'

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  config => {
    config.headers.Authorization = AuthService.setAuthorization()

    return config
  },
  error => Promise.reject(error)
)

export default http
