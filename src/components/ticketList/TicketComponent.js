import React, { Component } from "react";
import "./TicketComponent.css"

import driverIcon from "../../images/driver.svg";
import passengerIcon from "../../images/passenger.svg";

/**
 * Renders a ticket in the list view
 */
class TicketComponent extends Component {

    constructor(props) {
        super(props);

        if (props.ticketList[props.index].type === "driver") {
            this.icon = driverIcon;
            this.descriptionText = "Driving with open seats";

            if(props.ticketList[props.index].seats === 1) {
              this.seatsDescriptor = "seat available";
            } else {
              this.seatsDescriptor = "seats available";
            }
        } 
        else {
            this.icon = passengerIcon;
            this.descriptionText = "Buying a ride";
            if(props.ticketList[props.index].seats === 1) {
              this.seatsDescriptor = "person";
            } else {
              this.seatsDescriptor = "people";
            }
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
            <div className="ticketInfoMain">From: {this.props.ticketList[this.props.index].startLocation}</div>
            <div className="ticketInfoMain">To: {this.props.ticketList[this.props.index].endLocation}</div>
            <div className="ticketInfoSub">{this.descriptionText}</div>
            <div className="ticketInfoSub">{this.props.ticketList[this.props.index].date}
                                            , {this.props.ticketList[this.props.index].seats} {this.seatsDescriptor}</div>
          </div>
          <div className="ticketPriceCol">
            <div className="ticketPriceMain">${this.props.ticketList[this.props.index].price}.00</div>
            <div className="ticketPriceSub">per person</div>
          </div>
        </div>

      </div>
    );
  }

  onClick() {
    window.location.href = '/TicketDetails';
  }
}

export default TicketComponent;
