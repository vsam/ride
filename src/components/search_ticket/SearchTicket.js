import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import './SearchTicket.css';

export default class SearchTickets extends React.Component {
  constructor() {
    super();
    
    this.state = {
      uploading: false,
      ticket: {
        fromUCSD: true,
        isDriver: true,
        location: '',
        date: '',
        numOfSeats: '',
        price: '',
        description: '',
      }
    };

    this.driver = require('../../vectors/Driver button with Text.png');
    this.driverArchived = require('../../vectors/Archived Driver button with Text.png');
    this.passenger = require('../../vectors/Passenger button with Text.png');
    this.passengerArchived = require('../../vectors/Archived Passenger button with Text.png');
  }

  updateTicket(prop, event) {
    this.setState({
      ticket: {
        ...this.state.ticket,
        [prop]: event.target.value
      }
    });
  }

  handleNavBarSelect(fromUCSD) {
    this.setState({
      ticket: {
        ...this.state.ticket,
        fromUCSD
      }
    });
    
    var buttons = document.getElementsByClassName("tab-button");
    if (fromUCSD) {
      buttons[0].classList.add("selected");
      buttons[1].classList.remove("selected");
    } else {
      buttons[0].classList.remove("selected");
      buttons[1].classList.add("selected");
    }
  }

  handleRoleSelect(role) {
    this.setState({
      ticket: {
        ...this.state.ticket,
        isDriver: role === 'driver'
      }
    });

    var images = document.getElementsByClassName("image-button");
    switch (role) {
      case 'driver':
        images[0].classList.add("selected");
        images[1].classList.remove("selected");
        break;
      case 'passenger':
        images[0].classList.remove("selected");
        images[1].classList.add("selected");
        break;
      default:
        console.error('Unknown role.')
    }
  }

  handleSubmit() {
    this.setState({ uploading: true });
    firebase.firestore().collection('tickets').add(this.state.ticket);
  }

  render() {
    const { ticket, uploading } = this.state;
    let loaderStyle;
    if (!uploading) {
      loaderStyle = { visibility: 'hidden' };
    }

    return (
      <div>
        <div class="placeholder" style={loaderStyle}>
          <div class="loader"/>
        </div>
        
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <button
            className="tab-button selected"
            onClick={() => this.handleNavBarSelect(true)}
          >
            From UCSD
          </button>
          <button
            onClick={() => this.handleNavBarSelect(false)}
            className="tab-button"
          >
            To UCSD
          </button>
        </NavBar>

        <div className="form">
          <div className="headline">I am a ...</div>

          <div className="image-slot">
            <img
              alt="driver"
              src={ticket.isDriver ? this.driver : this.driverArchived}
              className="image-button selected"
              onClick={() => this.handleRoleSelect('driver')}
            />
            <img
              alt="passenger"
              src={ticket.isDriver ? this.passengerArchived : this.passenger}
              className="image-button"
              onClick={() => this.handleRoleSelect('passenger')}
            />
          </div>

          <div className="input-label">
            {(ticket.isDriver ? "Driving " : "Traveling ") +
             (ticket.fromUCSD ? "from UCSD to" : "to UCSD from")}
          </div>
          <input
            className="input"
            type="text"
            value={ticket.address}
            placeholder="Address"
            onChange={e => this.updateTicket('location', e)}
          />

          <div className="input-label">Departed on</div>
          <input
            className="input"
            type="text"
            value={ticket.date}
            placeholder="e.g. 5/13/19"
            onChange={e => this.updateTicket('date', e)}
          />

          <div className="input-label"># of people</div>
          <input
            className="input"
            type="text"
            value={ticket.numOfSeats}
            placeholder="e.g. 3"
            onChange={e => this.updateTicket('numOfSeats', e)}
          />

          <div className="input-label">Designed Price</div>
          <input
            className="input"
            type="text"
            value={ticket.price}
            placeholder="e.g. 20"
            onChange={e => this.updateTicket('price', e)}
          />

          <div className="input-label">Description</div>
          <textarea
            rows="5"
            className="input"
            value={ticket.description}
            placeholder="Specific Requirements."
            onChange={e => this.updateTicket('description', e)}
          />

          <button onClick={this.handleSubmit.bind(this)} className="submit">Post</button>
        </div>
      </div>
    );
  }
}
