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
      loading: true,
      fromUCSD: true
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var db = firebase.firestore();
    db.collection('tickets').orderBy('date')
      .get().then(querySnapshot => {
        var tickets = [];
        querySnapshot.forEach(doc => {
          let ticket = doc.data();
          ticket.id = doc.id;
          if(!ticket.archived){
            tickets.push(ticket);
          }
        });
        this.setState({ tickets, loading: false });
      });
  }

  render() {
    const { tickets, fromUCSD } = this.state;
    return (
      <div className="app">
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <TicketSelector onSelect={fromUCSD => this.setState({ fromUCSD })}/>
        </NavBar>

        <div className="bodyContent">
          <ScrollableTicketList
            tickets={tickets.filter(e => e.fromUCSD === fromUCSD)}
            history={this.props.history}
          />
        </div>

        <Loader loading={this.state.loading}/>
      </div>
    );
  }
};
