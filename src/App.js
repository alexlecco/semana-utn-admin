import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,} from 'react-router-dom';

import Navigation from './auth-pages/Navigation';
import LandingPage from './auth-pages/Landing';
import SignUpPage from './auth-pages/SignUp';
import SignInPage from './auth-pages/SignIn';
import PasswordForgetPage from './auth-pages/PasswordForget';
import HomePage from './auth-pages/Home';
import AccountPage from './auth-pages/Account';

import * as routes from './constants/routes';

import withAuthentication from './withAuthentication';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
      <Router>

        <div>
          <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"> Semana de la UTN - Admin </h1>
              </header>
            <Navigation authUser={this.state.authUser} />
            <hr/>

            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          </div>
        </div>

      </Router>
     );
  }
}

export default withAuthentication(App);
