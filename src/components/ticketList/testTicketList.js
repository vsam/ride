import React, { Component } from "react";
import firebase from 'firebase';
import 'firebase/database';

import ScrollableTicketList from "./scrollableTicketList";

import "./testTicketList.css";

class TestTicketList extends Component {
	
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
		const { ticketDB } = this.state;
		return (
			<div className="app">
				<div className="header">
					<h1 className="headerText">Search Tickets</h1>
				</div>
				<div className="bodyContent">
					<ScrollableTicketList ticketList={this.state.ticketDB} />
				</div>
			</div>
		);
	}
}

export default TestTicketList;
