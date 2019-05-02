import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home   from './components/pages/home';
import SearchTickets   from './components/pages/searchTickets';
// import PostTickets   from './components/pages/PostTickets';
import ViewMyTickets   from './components/pages/viewMyTickets';
import Login from './components/pages/login';
// import CheckInbox   from './components/pages/CheckInbox';
// import ViewProfile   from './components/pages/ViewProfile';

function App() {
	return (
		<Router>
			<div className="App">
				<Route exact path='/' component={Home}/>
				<Route exact path='/Home' component={Home}/>
				<Route exact path='/SearchTickets' component={SearchTickets} />
				<Route exact path='/PostTickets' component={Home}/>
				<Route exact path='/ViewMyTickets' component={ViewMyTickets} />
				<Route exact path='/CheckInbox' component={Home}/>
				<Route exact path='/ViewProfile' component={Home}/>
				<Route exact path='/Login' component={Login}/>
			</div>
		</Router>
	);
}

export default App;
