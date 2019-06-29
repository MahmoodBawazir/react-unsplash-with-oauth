import React from 'react'
import { connect } from 'react-redux'
import { fetchRandomPhotos, clearPhotos } from '../../actions'

import Searchbar from '../layout/Searchbar'
import PhotoList from '../layout/PhotoList'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchRandomPhotos(12)
  }

  componentWillUnmount() {
    this.props.clearPhotos()
  }

  render() {
    return (
      <div className="home-page">
        <Searchbar />
        <PhotoList name="random" />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchRandomPhotos,
  clearPhotos
}

export default connect(
  null,
  mapDispatchToProps
)(HomePage)
