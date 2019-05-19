import React, { Component } from 'react';
import ReactTable from "react-table";
import { Creatable } from 'react-select';

import "react-table/react-table.css";

class SearchTickets extends Component {
  render() {
    var status = this.props.data;
    var data = [];
    for (let device in status) {
      var machine = { name: device, status: status[device] + "" };
      data.push(machine);
    }
    return (
      <form>
        <h1>Searching Through Tickets</h1>
        <h3>Choose to Search as a Passenger/Driver</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Creatable
            styles={{
              option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: state.isSelected ? 'red' : 'blue',
                padding: 20,
              }),
              control: () => ({
                width: 200

              }),
              singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
              }
            }}
            name="form-field-name"
            value={1}
            onChange={function () { alert('Updated Search'); }}
            options={[
              { value: '0', label: 'Driver' },
              { value: '1', label: 'Passenger' }
            ]}
            placeholder="Advanced Search"
          />
        </div>
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
                  Header: "Start Location",
                  accessor: "start",
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
export default SearchTickets;