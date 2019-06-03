import React, { Component } from "react";
import driverIcon from "../../vectors/driver button.svg";
import passengerIcon from "../../vectors/passenger button.svg";
import "./TicketComponent.css"

/**
 * Renders a ticket in the list view
 */
class TicketComponent extends Component {
  handleClick() {
    this.props.history.push('/TicketDetail', { ticketId: this.props.ticket.id });
  }

  render() {
    var colorClass = this.props.index % 2 === 0 ? "evenTicketBG" : "oddTicketBG";
    const { ticket } = this.props;

    var seatDescriptor;
    if (ticket.isDriver === "driver") {
      seatDescriptor = (ticket.seats === 1 ? "seat" : "seats") + " available";
    } else {
      seatDescriptor = (ticket.seats === 1 ? "person" : "people");
    }

    return (
      <div
        key={this.props.index}
        style={this.props.style}
        className={"ticket " + colorClass}
        onClick={this.handleClick.bind(this)}
      >
        <div className="ticketContent">
          <img
            className="ticketImage"
            src={ticket.isDriver ? driverIcon : passengerIcon}
            alt="Driver/Passenger Icon"
          />

          <div className="ticketInfo">
            <div className="ticketInfoMain">
              From: {ticket.fromUCSD ? "UCSD" : ticket.location}
            </div>
            <div className="ticketInfoMain">
              To: {ticket.fromUCSD ? ticket.location : "UCSD"}
            </div>
            <div className="ticketInfoSub">
              {ticket.isDriver ? "Driving with open seats" : "Buying a ride"}
            </div>
            <div className="ticketInfoSub">
              {ticket.date}, {ticket.numOfSeats} {seatDescriptor}
            </div>
          </div>

          <div className="ticketPriceCol">
            <div className="ticketPriceMain">${ticket.price}.00</div>
            <div className="ticketPriceSub">per person</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketComponent;
