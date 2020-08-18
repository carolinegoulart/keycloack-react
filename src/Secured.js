import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

import Register from './components/register/Register';
import Import from './components/import/Import';

const jwt = require('jsonwebtoken');

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      isAdmin: false,
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });

        const decryptedToken = jwt.decode(keycloak.token);

        if (decryptedToken.groups && decryptedToken.groups.includes('ADMIN')) {
          this.setState({ isAdmin: true });
        }

        this.state.keycloak.loadUserInfo().then((userInfo) => {
          this.setState({
            name: userInfo.preferred_username,
            email: userInfo.email,
          });
        });
      });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        if (this.state.isAdmin) {
          return (
            <div>
              <Register
                keycloak={this.state.keycloak}
                name={this.state.name}
                email={this.state.email}
              />
            </div>
          );
        } else {
          return (
            <div>
              <Import name={this.state.name} email={this.state.email} />
            </div>
          );
        }
      } else {
        return <div>Unable to authenticate!</div>;
      }
    }
    return <div>Initializing Keycloak...</div>;
  }
}

export default Secured;
