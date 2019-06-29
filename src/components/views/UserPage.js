import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions'

import User from '../layout/User'

class UserPage extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.username)
  }

  render() {
    return (
      <div className="user-page">
        <User />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(
  null,
  mapDispatchToProps
)(UserPage)
