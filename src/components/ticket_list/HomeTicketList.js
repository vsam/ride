import React, { Component } from "react";
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import TicketSelector from '../common/TicketSelector';
import ScrollableTicketList from "./ScrollableTicketList";
import "./HomeTicketList.css";

export default class HomeTicketList extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    };
  }

  async componentDidMount() {
    var db = firebase.firestore();
    db.collection('tickets')
      .get().then(querySnapshot => {
        var tickets = [];
        querySnapshot.forEach(doc => {
          tickets.push(doc.data());
        });
        this.setState({ tickets });
      });
  }

  render() {
    return (
      <div className="app">
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <TicketSelector handleNavBarSelect={(fromUCSD) => {}}/>
        </NavBar>

        <div className="bodyContent">
          <ScrollableTicketList tickets={this.state.tickets} />
        </div>
      </div>
    );
  }
};
