import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home   from './components/pages/Home';
import SearchTickets   from './components/pages/searchTickets';
import ViewMyTickets   from './components/pages/viewMyTickets';
// import CheckInbox   from './components/pages/CheckInbox';
// import ViewProfile   from './components/pages/ViewProfile';
import Post from './components/post/Post';
import TicketDetail from './components/ticket_detail/TicketDetail';

function App() {
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
				<Route exact path='/TicketDetail' component={TicketDetail} />
			</div>
		</Router>
	);
}

export default App;
