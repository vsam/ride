import React, { Component } from "react";
import firebase from 'firebase';
import 'firebase/database';
import NavBar from '../common/NavBar';
import ScrollableTicketList from "./ScrollableTicketList";
import "./TicketList.css";

class TicketList extends Component {
	
	constructor() {
		super();
		this.state = {
			ticketDB: []
		};
	}

	async componentDidMount() {
		console.log("Hello I mounted the component")

		var database = firebase.database();
		
		database.ref("testTickets").once('value').then(function(snapshot) {

			// do criteria filtering here

			// for all tickets:
			var list = snapshot.val();

			// for only driver tickets:
			/*
			var list = snapshot.val().filter(function(item) {
				return item.type === "rider";
			});
			*/

			this.setState({ticketDB: list});

		}.bind(this));


		/*
		fetch('http://localhost:4000')
		.then(res => res.json())
		.then(
			(result) => {
				console.log("Data is being read");
				console.log("# of elements = " + result.length);
				this.setState({ticketDB: result});
			},
			(error) => {
				console.log("There is an error")
				console.log(error);
		  	}
		)
		*/
	}

	render() {
		return (
			<div className="app">
				<input type="checkbox" id="menustate" className="menustate" />
				<NavBar>
					<span className="headerText">Search Tickets</span>
				</NavBar>
				
				<div className="bodyContent">
					<ScrollableTicketList ticketList={this.state.ticketDB} />
				</div>
			</div>
		);
	}
}

export default TicketList;
