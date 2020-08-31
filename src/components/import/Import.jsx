import React, { Component } from "react";

import UploadArquivoUser from "../../components/upload/UploadUser";
import UploadArquivoAdmin from "../../components/upload/UploadAdmin";
import DownloadArquivo from "../../components/download/Downalod";
import Table from "../../components/table/Table";

export default class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled_upload: true,
    };

    this.loadUserCompany = this.loadUserCompany.bind(this);
  }

  async loadUserCompany() {
    return this.props.company;
  }

  render() {
    if (this.props.isAdmin === true) {
      return (
        <div>
          <div
            className="row wow fadeIn text-center"
            id="upload-and-download-container"
          >
            <DownloadArquivo />
            <UploadArquivoAdmin isAdmin={this.props.isAdmin} />
          </div>

          <Table />
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="row wow fadeIn text-center"
            id="upload-and-download-container"
          >
            <DownloadArquivo />
            <UploadArquivoUser
              isAdmin={this.props.isAdmin}
              loadUserCompany={this.loadUserCompany}
              company={this.props.company}
            />
          </div>

          <Table />
        </div>
      );
    }
  }
}
