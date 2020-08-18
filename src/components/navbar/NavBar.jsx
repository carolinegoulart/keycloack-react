import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from 'mdbreact';
import logo from '../../assets/img/logotipo_esfera.svg';

class NavBar extends Component {
  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
  }

  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar color="colorBack" light expand="md">
        <MDBNavbarBrand>
          <img src={logo} height="25" alt="" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className=" pr-2" />
                  <strong>{this.props.name}</strong>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right basic>
                  <MDBDropdownItem header>
                    Bem vindo {this.props.name}
                  </MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem onClick={() => this.logout()}>
                    Sair
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default withRouter(NavBar);
