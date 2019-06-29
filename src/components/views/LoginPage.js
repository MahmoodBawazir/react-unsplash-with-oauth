import React from 'react'
import { Message, Grid, Button } from 'semantic-ui-react'

const LoginPage = () => {
  return (
    <div className="login-page">
      <Grid centered columns={12}>
        <Grid.Column width={8}>
          <Message negative size="huge" style={{ textAlign: 'center' }}>
            <Message.Header>You must login to view this page.</Message.Header>
            <br />
            <Button secondary>Sign In</Button>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginPage
