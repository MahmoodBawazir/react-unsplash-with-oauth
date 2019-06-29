import { CLIENT_ID } from '../constants'

export default {
  getLocalStorageState() {
    return JSON.parse(localStorage.getItem('state'))
  },
  isSignedIn() {
    return (
      this.getLocalStorageState() && this.getLocalStorageState().auth.isSignedIn
    )
  },
  setAuthorization() {
    return this.isSignedIn()
      ? `Bearer ${this.getLocalStorageState().auth.accessToken}`
      : `Client-ID ${CLIENT_ID}`
  }
}
