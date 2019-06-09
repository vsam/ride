import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from "firebase/app";
import './App.css';
import LaunchScreen from './components/login/LaunchScreen';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import HomeTicketList from './components/ticket_list/HomeTicketList';
import SearchResultList from './components/ticket_list/SearchResultList';
import MyTickets from './components/ticket_list/MyTickets';
import PostTicket from './components/post_ticket/PostTicket';
import SearchTicket from './components/search_ticket/SearchTicket';
import TicketDetail from './components/ticket_detail/TicketDetail';
import WelcomeScreen from './components/login/WelcomeScreen'
import Profile from './components/profile/Profile';

export default class App extends Component {
  constructor(props) {
    super(props);
    const firebaseConfig = {
      apiKey: "AIzaSyDUkpXP3wSqSt5Rj8Aq8JYsmQlYO_2Zu4Q",
      authDomain: "ride-f1e96.firebaseapp.com",
      databaseURL: "https://ride-f1e96.firebaseio.com",
      projectId: "ride-f1e96",
      storageBucket: "ride-f1e96.appspot.com",
      messagingSenderId: "499959516483",
      appId: "1:499959516483:web:ff0f89a8aa351fd4"
    };
    firebase.initializeApp(firebaseConfig);
  }


  render() {
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <Route exact path='/' component={LaunchScreen} />
          <Route exact path='/WelcomeScreen' component={WelcomeScreen} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/SignUp' component={SignUp} />
          <Route exact path='/Home' component={HomeTicketList} />
          <Route exact path='/PostTicket' component={PostTicket} />
          <Route exact path='/SearchTicket' component={SearchTicket} />
          <Route exact path='/MyTickets' component={MyTickets} />
          <Route exact path='/Profile' component={Profile} />
          <Route exact path='/SearchResults' component={SearchResultList} />
          <Route exact path='/TicketDetail' component={TicketDetail} />
        </Router>
      </div>
    );
  }
};

