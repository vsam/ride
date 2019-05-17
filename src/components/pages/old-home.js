import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class Home extends Component {
	render() {
        let isLoggedIn = firebase.auth().currentUser !== null;
		return (
            <header className="App-header">
                <h1>Welcome to Ride+</h1>
                <h3>
                    <nav>
                        <ul style={{display: 'block'}}>
                            <li><Link to="/SearchTickets">Search Tickets</Link></li>
                            <li><Link to="/PostTicket">Post Tickets</Link></li>
                            <li><Link to="/ViewMyTickets">View My Tickets</Link></li>
                            <li><Link to="/TicketDetail">Ticket Detail</Link></li>
                            <li><Link to="/">Check Inbox</Link></li>
                            {isLoggedIn && <li><Link to="/Profile">View Profile</Link></li>}
                            {!isLoggedIn && <li><Link to='/Login'>Log in</Link></li>}
                            {!isLoggedIn && <li><Link to='/SignUp'>Sign Up</Link></li>}
                        </ul>
                    </nav>
                </h3>
            </header>
		);
	}
}
export default Home;