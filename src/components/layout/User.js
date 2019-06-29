import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Grid,
  Item,
  Segment,
  Header,
  Label,
  Button,
  Message,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class User extends React.Component {
  renderTags() {
    return this.props.user.tags.custom.map((tag, index) => (
      <Label key={index} size="small">
        {tag.title}
      </Label>
    ))
  }

  renderEditButton() {
    if (this.props.isCurrentUser) {
      return (
        <Item.Extra>
          <Button basic size="tiny" as="div">
            <Link to="/me/edit">Edit Profile</Link>
          </Button>
        </Item.Extra>
      )
    }
  }

  render() {
    const { profile_image, name, tags, error } = this.props.user

    if (error) {
      return (
        <Message negative>
          <Message.Header>Network error. Please try again later</Message.Header>
        </Message>
      )
    }

    return (
      <Grid centered columns={12}>
        <Grid.Column width={9}>
          <Segment padded="very">
            {this.props.isFetching ? (
              <Dimmer active inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            ) : (
              <Item.Group>
                <Item>
                  <Item.Image
                    size="small"
                    avatar
                    bordered
                    src={profile_image ? profile_image.large : ''}
                  />

                  <Item.Content verticalAlign="middle">
                    <Item.Header as="div">
                      <Header as="h1">{name}</Header>
                    </Item.Header>
                    <Item.Description>
                      <h5 className="grey">Interests</h5>
                      {tags ? this.renderTags() : ''}
                    </Item.Description>
                    {this.renderEditButton()}
                  </Item.Content>
                </Item>
              </Item.Group>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    error: state.user.error,
    isFetching: state.user.isFetching,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(User)
