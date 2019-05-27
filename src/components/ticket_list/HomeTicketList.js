import React, { Component } from "react";
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import TicketSelector from '../common/TicketSelector';
import ScrollableTicketList from "./ScrollableTicketList";
import "./TicketList.css";

export default class HomeTicketList extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      loading: true
    };
  }

  async componentDidMount() {
    var db = firebase.firestore();
    db.collection('tickets')
      .get().then(querySnapshot => {
        var tickets = [];
        querySnapshot.forEach(doc => {
          let ticket = doc.data();
          ticket.id = doc.id;
          tickets.push(ticket);
        });
        this.setState({ tickets, loading: false });
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
          <ScrollableTicketList
            tickets={this.state.tickets}
            history={this.props.history}
          />
        </div>

        <Loader loading={this.state.loading}/>
      </div>
    );
  }
};
