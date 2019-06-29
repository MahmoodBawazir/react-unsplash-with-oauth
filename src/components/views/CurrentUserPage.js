import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUser } from '../../actions'

import User from '../layout/User'

class UserPage extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser()
  }

  render() {
    return (
      <div className="user-page">
        <User isCurrentUser={true} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchCurrentUser
}

export default connect(
  null,
  mapDispatchToProps
)(UserPage)
