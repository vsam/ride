import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from "firebase/app";
import './App.css';
import Home   from './components/pages/home';
import SearchTickets   from './components/pages/searchTickets';
// import PostTickets   from './components/pages/PostTickets';
import ViewMyTickets   from './components/pages/viewMyTickets';
// import CheckInbox   from './components/pages/CheckInbox';
// import ViewProfile   from './components/pages/ViewProfile';
import TestTicketList from './components/ticketList/testTicketList';
import Post from './components/post/Post';
import TicketDetail from './components/ticket_detail/TicketDetail';
import { tsConstructorType } from '@babel/types';

class App extends Component {

	constructor(props) {
		
		super(props);

		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyDUkpXP3wSqSt5Rj8Aq8JYsmQlYO_2Zu4Q",
			authDomain: "ride-f1e96.firebaseapp.com",
			databaseURL: "https://ride-f1e96.firebaseio.com",
			projectId: "ride-f1e96",
			storageBucket: "ride-f1e96.appspot.com",
			messagingSenderId: "499959516483",
			appId: "1:499959516483:web:ff0f89a8aa351fd4"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}
	

	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path='/' component={Home}/>
					<Route exact path='/Home' component={Home}/>
					<Route exact path='/SearchTickets' component={SearchTickets} />
					<Route exact path='/PostTicket' component={Post}/>
					<Route exact path='/ViewMyTickets' component={ViewMyTickets} />
					<Route exact path='/CheckInbox' component={Home}/>
					<Route exact path='/ViewProfile' component={Home} />
					<Route exact path='/TestTicketList' component={TestTicketList} />
					<Route exact path='/TicketDetails' component={TicketDetail} />
				</div>
			</Router>
		);
	}
}

export default App;
