import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

import UnsplashAuth from '../UnsplashAuth'

class Navbar extends React.Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="navbar" style={{ marginBottom: '50px' }}>
        <Menu size="huge">
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as="div"
          >
            <Link to="/">MyPhotos</Link>
          </Menu.Item>

          <Menu.Menu position="right">
            {this.props.isSignedIn ? (
              <Menu.Item>
                <Link to="/me">
                  <Icon name="user" /> Profile
                </Link>
              </Menu.Item>
            ) : (
              ''
            )}
            <Menu.Item>
              <UnsplashAuth />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(Navbar)
