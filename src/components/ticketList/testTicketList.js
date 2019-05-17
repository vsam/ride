import React, { Component } from "react";
import { LoremIpsum } from "lorem-ipsum";

import ScrollableTicketList from "./scrollableTicketList";

import "./testTicketList.css";

const rowCount = 100;

class TestTicketList extends Component {
	
	constructor() {
		super();
		this.state = {
			ticketDB: []
		};
	}

	async componentDidMount() {
		console.log("Hello I mounted the component")
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
