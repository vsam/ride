import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class Home extends Component {
	render() {
        let isLoggedIn = firebase.auth().currentUser !== null;
        console.log(firebase.auth().currentUser);
		return (
            <header className="App-header">
                <h1>Welcome to Ride+</h1>
                <h3>
                    <nav>
                        <ul style={{display: 'block'}}>
                            <Link to="/SearchTickets">Search Tickets</Link>
                            <br />
                            <Link to="/Home">Post Tickets</Link>
                            <br />
                            <Link to="/ViewMyTickets">View My Tickets</Link>
                            <br/>
                            <Link to="/Home">Check Inbox</Link>
                            
                            {isLoggedIn?<Link to="/Profile">View Profile</Link>:<br/>}
                            {!isLoggedIn?<Link to='/Login'>Log in </Link>:<br/>}
                            {!isLoggedIn?<Link to='/SignUp'>Sign Up</Link>:<br/>}
                           
                            
                            {/*<br />
                            <Link to='/Login'>Log in </Link>
                            <br />
                            <Link to='/SignUp'>Sign Up</Link>*/}
                        </ul>
                    </nav>
                </h3>
            </header>
		);
	}
}
export default Home;