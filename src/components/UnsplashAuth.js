import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import {
  OAUTH_AUTHORIZE_URL,
  OAUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  SCOPE
} from '../constants'
import unsplash from '../api/unsplash'
import history from '../history'
import { signIn, signOut } from '../actions'
import { Button } from 'semantic-ui-react'

class UnsplashAuth extends React.Component {
  componentDidMount() {
    if (history.location) {
      const codeParam = qs.parse(history.location.search, {
        ignoreQueryPrefix: true
      }).code

      if (codeParam) {
        this.userAuthentication(codeParam)
          .then(response => this.props.signIn(response.data.access_token))
          .then(() => history.push('/'))
      }
    }
  }

  userAuthentication = async code => {
    const url = OAUTH_TOKEN_URL

    return await unsplash.request({
      url,
      method: 'POST',
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: CALLBACK_URL,
        grant_type: 'authorization_code',
        code
      }
    })
  }

  getAuthenticationUrl = () => {
    const querystrings = qs.stringify({
      client_id: CLIENT_ID,
      redirect_uri: CALLBACK_URL,
      response_type: 'code',
      scope: SCOPE.length > 1 ? SCOPE.join('+') : SCOPE.toString()
    })

    return decodeURIComponent(`${OAUTH_AUTHORIZE_URL}?${querystrings}`)
  }

  onSignInClick = () => {
    const authenticationUrl = this.getAuthenticationUrl()

    window.location.assign(authenticationUrl)
  }

  onSignOutClick = () => {
    this.props.signOut()

    history.push('/')
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn) {
      return (
        <Button onClick={this.onSignOutClick} secondary>
          Sign Out
        </Button>
      )
    } else {
      return (
        <Button onClick={this.onSignInClick} primary>
          Sign In
        </Button>
      )
    }
  }

  render() {
    return this.renderAuthButton()
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(UnsplashAuth)
