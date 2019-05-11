import React, { Component } from "react";
import { LoremIpsum } from "lorem-ipsum";

import ScrollableTicketList from "./scrollableTicketList";

import "./testTicketList.css";

const rowCount = 100;

class TestTicketList extends Component {
  constructor() {
    super();

    const lorem = new LoremIpsum({
      wordsPerSentence: {
        max: 2,
        min: 2
      }
    });

    this.list = Array(rowCount)
      .fill()
      .map((val, idx) => {
        var name = "Driver";
        var type = "driver";
        
        if (Math.random() > 0.5) {
          name = "Passenger";
          type = "rider";
        }

        return {
          id: idx,
          type: type,
          name: name + " #" + idx,
          text: lorem.generateWords(2) + " ⇒ " + lorem.generateWords(2),
          location: "UCSD",
          date: "5/5/19",
          price: "$25",
          seats: 3,
        };
      }
    );

  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <h1 className="headerText">Search Tickets</h1>
        </div>
        <div className="bodyContent">
          <ScrollableTicketList ticketList={this.list} />
        </div>
      </div>
    );
  }
}

export default TestTicketList;
