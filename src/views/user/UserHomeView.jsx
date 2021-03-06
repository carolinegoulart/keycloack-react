import React, { Component } from "react";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import ImportView from "../../views/import/ImportView";

export default class UserHomeView extends Component {
  render() {
    return (
      <div>
        <NavBar
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />
        <ImportView company={this.props.company} />
        <Footer />
      </div>
    );
  }
}
