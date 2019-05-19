import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from "firebase/app";
import './App.css';
//import Home from './components/pages/old-home';
import Home from './components/home/Home';
import LaunchScreen from './components/login/LaunchScreen';
import SearchTickets   from './components/home/SearchTickets';
import ViewMyTickets   from './components/home/ViewMyTickets';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import PostTicket from './components/post_ticket/PostTicket';
import TicketDetail from './components/ticket_detail/TicketDetail';
import Profile from './components/profile/Profile';

class App extends Component {
	constructor(props){

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

	render(){
		return (
			<Router>
				<div className="App">
					<Route exact path='/' component={LaunchScreen}/>
					<Route exact path='/Home' component={Home}/>
					<Route exact path='/SearchTickets' component={SearchTickets} />
					<Route exact path='/PostTicket' component={PostTicket}/>
					<Route exact path='/ViewMyTickets' component={ViewMyTickets} />
					<Route exact path='/TicketDetail' component={TicketDetail} />
					<Route exact path='/CheckInbox' component={Home}/>
					<Route exact path='/Profile' component={Profile} />
					<Route exact path='/Login' component={Login} />
					<Route exact path='/SignUp' component={SignUp} />
				</div>
			</Router>
		);
	}
}

export default App;
