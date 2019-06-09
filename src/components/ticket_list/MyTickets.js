import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import ScrollableTicketList from "./ScrollableTicketList";
import "./TicketList.css";

export default class MyTickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      loading: true
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    var db = firebase.firestore();
    var ref = db.collection('tickets');
    ref.where("email", "==", localStorage.getItem('email'))
      .get().then(querySnapshot => {
        var tickets = [];
        querySnapshot.forEach(doc => {
          let ticket = doc.data();
          ticket.id = doc.id;
          tickets.push(ticket);
        });
        tickets.sort((a, b) => a.date.seconds - b.date.seconds);
        this.setState({ tickets, loading: false });
      });
  }

  render() {
    return (
      <div className="app">
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> My Tickets </NavBar>

        <div className="bodyContent">
          <ScrollableTicketList
            tickets={this.state.tickets}
            history={this.props.history}
          />
        </div>
        <Loader loading={this.state.loading} />
      </div>
    );
  }
};
