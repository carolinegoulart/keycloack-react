import React, { Component } from 'react';
import Importacao from '../importacao/Importacao';

export default class HomePage extends Component {
  render() {
    return (
      <main className="pt-2 mx-lg-3">
        <div className="container-fluid mt-4">
          <Importacao />
        </div>
      </main>
    );
  }
}
