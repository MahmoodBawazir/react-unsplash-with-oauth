import React from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import slugify from 'slugify'

import { fetchSearchPhotos } from '../../actions'
import { Segment, Form, Input, Header, Icon } from 'semantic-ui-react'

export class Searchbar extends React.Component {
  state = { query: '' }

  onFormSubmit = e => {
    e.preventDefault()

    // this.props.fetchSearchPhotos(this.state.query)
    history.push(`/search/${slugify(this.state.query, { lower: true })}`)
  }

  render() {
    return (
      <div className="search-bar">
        <Segment padded="very">
          <Header as="h1" textAlign="left">
            <Icon name="photo" />
            MyPhotos
          </Header>
          <p>The internet’s source of freely useable images.</p>

          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <Input
                icon={{ name: 'search', circular: false, link: true }}
                size="huge"
                fluid
                placeholder="Search..."
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                required
              />
            </Form.Field>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { photos: state.photos }
}

const mapDispatchToProps = {
  fetchSearchPhotos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbar)
