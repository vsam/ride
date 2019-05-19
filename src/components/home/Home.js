import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <header className="App-header">
        <h1>Welcome to Ride+</h1>
        <nav>
          <ul style={{ display: 'block' }}>
            <Link to="/SearchTickets">Search Tickets</Link>
            <br />
            <Link to="/PostTicket">Post Tickets</Link>
            <br />
            <Link to="/Home">Check Inbox</Link>
            <br />
            <Link to="/Profile">View Profile</Link>
            <br />
            <Link to="/ViewMyTickets">View My Tickets</Link>
            <br/>
            <Link to="/TicketDetail">TEST Ticket Detail</Link>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Home;