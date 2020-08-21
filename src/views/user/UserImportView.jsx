import React, { Component } from 'react';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import HomePage from '../../components/homePage/HomePage';

export default class UserImportView extends Component {
  render() {
    return (
      <div>
        <NavBar
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />
        <HomePage />
        <Footer />
      </div>
    );
  }
}
