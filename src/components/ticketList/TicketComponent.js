import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import "./TicketComponent.css";

import driverIcon from "../../images/driver.svg";
import passengerIcon from "../../images/passenger.svg";

/**
 * Renders a ticket in the list view
 */
class TicketComponent extends Component {

	constructor(props) {
		super(props);

		var listData = props.ticketList[props.index];

		if (listData.role === "passenger") {
			this.icon = passengerIcon;
			this.descriptionText = "Buying a ride";
			if (listData.seats === 1) {
				this.seatsDescriptor = "person";
			} else {
				this.seatsDescriptor = "people";
			}
		}
		else {
			this.icon = driverIcon;
			this.descriptionText = "Driving with open seats";

			if (listData.seats === 1) {
				this.seatsDescriptor = "seat available";
			} else {
				this.seatsDescriptor = "seats available";
			}
		}

		if (listData.fromUCSD === true) {
			this.fromText = "UCSD";
			this.toText = listData.location;
		} else {
			this.fromText = listData.location;
			this.toText = "UCSD";
		}

		this.numOfSeats = listData.numOfSeats;
		this.date = listData.date;
		this.price = listData.price;
		this.ticketID = listData.ticketID;
	}

	render() {
		var colorClass =
			this.props.index % 2 === 0 ? "evenTicketBG" : "oddTicketBG";
		return (
			<div
				style={this.props.style}
				className={"ticket " + colorClass}
				onClick={this.onClick.bind(this)}
			>

				<div className="ticketContent">

					<img
						className="ticketImage"
						src={this.icon}
						alt=""
					/>
					<div className="ticketInfo">
						<div className="ticketInfoMain">From: {this.fromText}</div>
						<div className="ticketInfoMain">To: {this.toText}</div>
						<div className="ticketInfoSub">{this.descriptionText}</div>
						<div className="ticketInfoSub">{this.date}
							, {this.numOfSeats} {this.seatsDescriptor}</div>
					</div>
					<div className="ticketPriceCol">
						<div className="ticketPriceMain">${this.price}.00</div>
						<div className="ticketPriceSub">per person</div>
					</div>
				</div>

			</div>
		);
	}

	onClick() {
		this.props.history.push('/TicketDetail',
			{
				ticketID: this.ticketID
			}
		);
	}
}

const TicketComponentWithRouter = withRouter(TicketComponent);
export default TicketComponentWithRouter;
