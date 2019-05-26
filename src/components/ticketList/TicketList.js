import React, { Component } from "react";
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/firestore';
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

		var db = firebase.firestore();
		
		var tempDB = []

		db.collection("tickets").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// filter by optional criteria here

				tempDB.push({
					...doc.data(),
					ticketID: doc.id,
				});

			})
			console.log(tempDB);
			this.setState({ticketDB: tempDB}, () => {
				console.log(this.state.ticketDB);
			});
		}.bind(this));
		/*
		database.ref("testTickets").once('value').then(function(snapshot) {

			// do criteria filtering here

			// for all tickets:
			// var list = snapshot.val();

			// for only driver tickets:
			var list = snapshot.val().filter(function(item) {
				return item.type === "rider";
			});

			this.setState({ticketDB: list});

		}.bind(this));
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
