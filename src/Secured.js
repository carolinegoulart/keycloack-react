import React, { Component } from "react";
import Keycloak from "keycloak-js";

import UserHomeView from "./views/user/UserHomeView";
import AdminHomeView from "./views/admin/AdminHomeView";

const jwt = require("jsonwebtoken");

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      isAdmin: false,
      name: "",
      email: "",
      company: "",
    };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });

        const decryptedToken = jwt.decode(keycloak.token);

        if (decryptedToken.realm_access) {
          if (
            decryptedToken.realm_access.roles.includes("ADMIN") ||
            decryptedToken.realm_access.roles.includes("admin")
          ) {
            this.setState({ isAdmin: true });
          } else {
            this.setState({
              company: decryptedToken.realm_access.roles[2],
            });
          }
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
              <AdminHomeView
                isAdmin={this.state.isAdmin}
                keycloak={this.state.keycloak}
                name={this.state.name}
                email={this.state.email}
              />
            </div>
          );
        } else {
          return (
            <div>
              <UserHomeView
                idAdmin={this.state.isAdmin}
                keycloak={this.state.keycloak}
                name={this.state.name}
                email={this.state.email}
                company={this.state.company}
              />
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
