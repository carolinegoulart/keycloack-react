import React, { Component } from "react";
import Import from "../../components/import/Import";

export default class ImportView extends Component {
  render() {
    return (
      <main className="pt-2 mx-lg-3" id="main-container">
        <div className="container-fluid mt-4">
          <Import isAdmin={this.props.isAdmin} company={this.props.company} />
        </div>
      </main>
    );
  }
}
