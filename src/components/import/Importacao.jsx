import React, { Component } from 'react';

import UploadArquivo from '../../components/upload/Upload';
import DownloadArquivo from '../../components/download/Downalod';
import Table from '../../components/table/Table';

export default class Importacao extends Component {
  render() {
    return (
      <div>
        <div
          className="row wow fadeIn text-center"
          id="upload-and-download-container"
        >
          <DownloadArquivo />
          <UploadArquivo isAdmin={this.props.isAdmin} />
        </div>

        <Table />
      </div>
    );
  }
}
