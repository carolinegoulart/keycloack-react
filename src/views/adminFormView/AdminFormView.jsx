import React, { Component } from 'react';

import NavBar from '../../components/navbar/NavBar';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
import Form from '../../components/form/Form';
import Footer from '../../components/footer/Footer';

export default class AdminFormView extends Component {
  render() {
    return (
      <div>
        <NavBar
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />
        <OptionsMenu />
        <Form />
        <Footer />
      </div>
    );
  }
}
