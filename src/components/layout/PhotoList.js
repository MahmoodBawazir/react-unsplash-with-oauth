import './PhotoList.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Moment from 'react-moment'
import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchRandomPhotos, fetchSearchPhotos } from '../../actions'
import { Card, Image, Icon, List, Loader, Message } from 'semantic-ui-react'

class PhotoList extends React.Component {
  state = { page: 1 }

  renderList() {
    return this.props.photos.map(
      ({ id, urls, user, created_at, likes }, index) => (
        <Card key={index}>
          <a
            href={urls.full}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src={urls.regular}
              wrapped
              ui={false}
              className="main-image"
            />
          </a>
          <Card.Content>
            <div>
              <Image avatar src={user.profile_image.medium} />
              <span>
                <Link to={`/users/${user.username}`}>{user.name}</Link>
              </span>
            </div>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>
              <List horizontal>
                <List.Item>
                  <span className="date">
                    <Icon name="calendar" />
                    <Moment format="DD MMM, YYYY">{created_at}</Moment>
                  </span>
                </List.Item>
                <List.Item>
                  <span>
                    <Icon name="heart" size="small" />
                    &nbsp;{likes}
                  </span>
                </List.Item>
              </List>
            </Card.Meta>
          </Card.Content>
        </Card>
      )
    )
  }

  render() {
    const {
      photos,
      name,
      query,
      totalPages,
      fetchRandomPhotos,
      fetchSearchPhotos,
      isFetching,
      error
    } = this.props

    // const { page } = this.state

    if (photos.length <= 0 && !isFetching && !error) {
      return (
        <Message negative>
          <Message.Header>No photos found to show.</Message.Header>
        </Message>
      )
    }

    if (error) {
      return (
        <Message negative>
          <Message.Header>
            Network error, please try again later.
          </Message.Header>
        </Message>
      )
    }

    return (
      <div className="photo-list">
        <InfiniteScroll
          dataLength={photos}
          next={() => {
            if (name === 'random') {
              fetchRandomPhotos(12)
            } else if (name === 'search') {
              this.setState({ page: this.state.page + 1 }, () => {
                fetchSearchPhotos(query, this.state.page)
              })
            }
          }}
          hasMore={name === 'search' ? this.state.page < totalPages : true}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
        >
          <Card.Group itemsPerRow={4}>{this.renderList()}</Card.Group>
        </InfiniteScroll>
        {isFetching ? <Loader active inline="centered" /> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos.data,
    isFetching: state.photos.isFetching,
    totalPages: state.photos.totalPages,
    error: state.photos.error
  }
}

const mapDispatchToProps = {
  fetchRandomPhotos,
  fetchSearchPhotos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
