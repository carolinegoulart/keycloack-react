import React, { Component } from 'react';

import NavBar from '../../components/navbar/NavBar';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
import Form from '../../components/form/Form';
import Footer from '../../components/footer/Footer';

export default class AdminFormView extends Component {
  state = {
    keycloak: '',
    name: '',
    email: '',
  };

  componentDidMount() {
    const { keycloak, name, email } = this.props.location.state;

    this.setState(() => ({
      keycloak,
      name,
      email,
    }));
  }

  render() {
    console.log(this.props);
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
