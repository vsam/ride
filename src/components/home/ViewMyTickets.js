import React, { Component } from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

class ViewMyTickets extends Component {
  render() {
    var status = this.props.data;
    var data = [];
    for (let device in status) {
      var machine = { name: device, status: status[device] + "" };
      data.push(machine);
    }
    return (
      <form>
        <h1>My Tickets</h1>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  accessor: "date",
                  width: 300,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Departure Time",
                  accessor: "time",
                  width: 300,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Start Location",
                  accessor: "start",
                  width: 300,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Drop Off",
                  accessor: "end",
                  width: 300,
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </form>
    );
  }
}
export default ViewMyTickets;