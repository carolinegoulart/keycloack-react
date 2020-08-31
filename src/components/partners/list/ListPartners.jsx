import React, { Component } from "react";

export default class ListPartners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // partners: [],
    };
  }

  render() {
    return (
      <div>
        <div>
          <table id="table-partners">
            <thead>
              <tr>
                <th>Partner Code</th>
                <th>Partner Name</th>
              </tr>
            </thead>
            <tbody>
              {this.props.partners.map((partner) => {
                return (
                  <tr key={partner.partnerCode}>
                    <td>{partner.partnerCode}</td>
                    <td>{partner.partnerName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
