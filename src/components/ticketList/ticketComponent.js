import React, { Component } from "react";
import "./ticketComponent.css"

import driverIcon from "../../images/driver.svg";
import passengerIcon from "../../images/passenger.svg";

/**
 * Renders a ticket in the list view
 */
class TicketComponent extends Component {

  constructor(props) {
    super(props);

    if(props.ticketList[props.index].type === "driver") {
      this.icon = driverIcon;
      this.descriptionText = "Driving with open seats";
      this.seatsDescriptor = "seats available";
    } else {
      this.icon = passengerIcon;
      this.descriptionText = "Buying a ride";
      this.seatsDescriptor = "people";
    }
  }

  render() {
    var colorClass =
      this.props.index % 2 === 0 ? "evenTicketBG" : "oddTicketBG";
    return (
      <div
        key={this.props.key}
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
            <div className="ticketInfoMain">From UCSD to San Francisco</div>
            <div className="ticketInfoSub">{this.descriptionText}</div>
            <div className="ticketInfoSub">On 5/6/19, 3 {this.seatsDescriptor}</div>
          </div>
          <div className="ticketPriceCol">
            <div className="ticketPriceMain">$25.00</div>
            <div className="ticketPriceSub">per person</div>
          </div>
        </div>

      </div>
    );
  }

  onClick() {
    // TODO: open the ticket detail view
    alert("Ticket " + this.props.index + " was clicked");
  }
}

export default TicketComponent;
