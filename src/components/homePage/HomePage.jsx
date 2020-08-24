import React, { Component } from 'react';
import Importacao from '../../components/import/Importacao';

export default class HomePage extends Component {
  render() {
    return (
      <main className="pt-2 mx-lg-3" id="main-container">
        <div className="container-fluid mt-4">
          <Importacao isAdmin={this.props.isAdmin} />
        </div>
      </main>
    );
  }
}
