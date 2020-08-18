import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getFileModelo } from '../download/DownloadAction';

class OptionsMenu extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="admin-menu">
        <div className="admin-menu-header">Selecione uma opção</div>
        <div className="buttons-admin-menu">
          <Link
            to={{
              pathname: '/register',
              state: {
                keycloak: this.props.keycloak,
                name: this.props.name,
                email: this.props.email,
              },
            }}
            className="button-admin"
          >
            Cadastrar nova campanha
          </Link>
          <Link
            to={{ pathname: '/import' }}
            className="button-admin"
            onClick={getFileModelo}
          >
            Importar CSV da campanha
          </Link>
        </div>
      </div>
    );
  }
}
export default OptionsMenu;
