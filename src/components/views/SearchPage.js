import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import numeral from 'numeral'

import { fetchSearchPhotos, clearPhotos } from '../../actions'

import PhotoList from '../layout/PhotoList'

class SearchPage extends React.Component {
  componentDidMount() {
    const query = this.props.match.params.query
    const page = 1

    this.props.fetchSearchPhotos(query, page)
  }

  componentWillUnmount() {
    this.props.clearPhotos()
  }

  render() {
    return (
      <div className="search-page">
        <Header as="h1">
          <div style={{ textTransform: 'capitalize', marginBottom: '20px' }}>
            {this.props.match.params.query}
          </div>
          <Header.Subheader>
            {numeral(this.props.total).format('0a')} Photos.
          </Header.Subheader>
        </Header>
        <PhotoList name="search" query={this.props.match.params.query} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { total: state.photos.total, totalPages: state.photos.totalPages }
}

const mapDispatchToProps = {
  fetchSearchPhotos,
  clearPhotos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
