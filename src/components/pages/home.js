import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
            <header className="App-header">
                <h1>Welcome to Ride+</h1>
                <h3>
                    <nav>
                        <ul>
                            <Link to="/SearchTickets">Search Tickets</Link>
                            <br />
                            <Link to="/Home">Post Tickets</Link>
                            <br />
                            <Link to="/ViewMyTickets">View My Tickets</Link>
                            <br />
                            <Link to="/Home">Check Inbox</Link>
                            <br />
                            <Link to="/Home">View Profile</Link>
                            <br />
                            <Link to='/Login'>Log in </Link>
                            <br />
                            <Link to='/SignUp'>Sign Up</Link>
                        </ul>
                    </nav>
                </h3>
            </header>
		);
	}
}
export default Home;