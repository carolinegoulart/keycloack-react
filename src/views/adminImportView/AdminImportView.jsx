import React, { Component } from 'react';

import NavBar from '../../components/navbar/NavBar';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
import Footer from '../../components/footer/Footer';
import HomePage from '../homePage/HomePage';

export default class AdminImportView extends Component {
  render() {
    return (
      <div>
        <NavBar
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />
        <OptionsMenu />
        <HomePage />
        <Footer />
      </div>
    );
  }
}
