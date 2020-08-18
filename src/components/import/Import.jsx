import React, { Component } from 'react';

import NavBar from '../navbar/NavBar';
import OptionsMenu from '../optionsMenu/OptionsMenu';
import HomePage from '../../views/homePage/HomePage';
import Footer from '../footer/Footer';

class Import extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  render() {
    return (
      <div>
        <NavBar name={this.props.name} email={this.props.email} />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default Import;
