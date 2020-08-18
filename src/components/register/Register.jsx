import React, { Component } from 'react';

import NavBar from '../navbar/NavBar';
import OptionsMenu from '../optionsMenu/OptionsMenu';
import HomePage from '../../views/homePage/HomePage';
import Footer from '../footer/Footer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      name: '',
      email: '',
    };
  }

  render() {
    return (
      <div>
        <NavBar
          keycloak={this.state.keycloak}
          name={this.state.name}
          email={this.state.email}
        />
        <OptionsMenu />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default Register;
