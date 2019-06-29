import './App.css'
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import history from '../history'

import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import SearchPage from './views/SearchPage'
import CurrentUserPage from './views/CurrentUserPage'
import CurrentUserEditPage from './views/CurrentUserEditPage'
import UserPage from './views/UserPage'
import PrivateRoute from './PrivateRoute'
// import Callback from './Callback'
import Navbar from './layout/Navbar'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <PrivateRoute path="/me" exact component={CurrentUserPage} />
              <PrivateRoute
                path="/me/edit"
                exact
                component={CurrentUserEditPage}
              />
              <Route path="/users/:username" exact component={UserPage} />
              <Route path="/search/:query" exact component={SearchPage} />
            </Switch>
          </Container>
        </Router>
      </div>
    )
  }
}

export default App
