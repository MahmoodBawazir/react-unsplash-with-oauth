import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUser, editCurrentUser } from '../../actions'

import { Field, reduxForm } from 'redux-form'
import {
  Message,
  Form,
  Grid,
  Segment,
  Header,
  Button,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class UserEditPage extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser()
  }

  onFormSubmit = formValues => {
    return new Promise(resolve => {
      return this.props.editCurrentUser(formValues, resolve)
    })
  }

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <Message error>
          <Message.Header>{error}</Message.Header>
        </Message>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const classNames = `field ${meta.error && meta.touched ? 'error' : ''}`

    return (
      <Form.Field className={classNames}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </Form.Field>
    )
  }

  renderTextarea = ({ label, input }) => {
    return <Form.TextArea label={label} {...input} />
  }

  renderButton(submitting, pristine) {
    if (submitting) {
      return (
        <Button type="submit" loading fluid secondary disabled>
          Loading
        </Button>
      )
    } else {
      return (
        <Button type="submit" secondary fluid disabled={pristine}>
          Submit
        </Button>
      )
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      submitSucceeded,
      pristine,
      isFetching
    } = this.props

    return (
      <div className="user-edit-page">
        <Grid centered>
          <Grid.Column width={10}>
            <Segment padded="very">
              {isFetching ? (
                <Dimmer active inverted>
                  <Loader inverted content="Loading" />
                </Dimmer>
              ) : (
                <React.Fragment>
                  <Header as="h1" size="huge">
                    Edit Profile
                  </Header>
                  {submitSucceeded ? (
                    <Message positive>
                      <Message.Header>Successfully edited!</Message.Header>
                    </Message>
                  ) : (
                    ''
                  )}
                  <Form
                    onSubmit={handleSubmit(this.onFormSubmit)}
                    className="error"
                  >
                    <Form.Group unstackable widths={2}>
                      <Field
                        name="first_name"
                        component={this.renderInput}
                        label="First Name"
                      />
                      <Field
                        name="last_name"
                        label="Last Name"
                        component={this.renderInput}
                      />
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                      <Field
                        name="username"
                        component={this.renderInput}
                        label="Username"
                      />

                      <Field
                        name="email"
                        label="Email Address"
                        component={this.renderInput}
                      />
                    </Form.Group>
                    <Form.Group unstackable widths={3}>
                      <Field
                        name="url"
                        label="Personal site/portfolio"
                        component={this.renderInput}
                      />
                      <Field
                        name="location"
                        label="Location"
                        component={this.renderInput}
                      />
                      <Field
                        name="instagram_username"
                        label="Instagram username"
                        component={this.renderInput}
                      />
                    </Form.Group>

                    <Field
                      name="bio"
                      label="Bio"
                      component={this.renderTextarea}
                    />

                    {this.renderButton(submitting, pristine)}
                  </Form>
                </React.Fragment>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.username) {
    errors.username = 'Username cant be blank'
  }

  if (!formValues.first_name) {
    errors.first_name = 'First Name cant be blank'
  }

  if (!formValues.last_name) {
    errors.last_name = 'Last Name cant be blank'
  }

  if (!formValues.email) {
    errors.email = 'Email address cant be blank'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    isFetching: state.user.isFetching,
    initialValues: {
      url: state.user.data.portfolio_url,
      ..._.pick(
        state.user.data,
        'username',
        'first_name',
        'last_name',
        'email',
        'location',
        'bio',
        'instagram_username'
      )
    }
  }
}

const mapDispatchToProps = {
  fetchCurrentUser,
  editCurrentUser
}

const formWrap = reduxForm({
  form: 'userEditForm',
  validate,
  enableReinitialize: true
})(UserEditPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(formWrap)
