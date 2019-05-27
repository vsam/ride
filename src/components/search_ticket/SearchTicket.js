import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import Driver from '../../vectors/Driver button with Text.png';
import ArchivedDriver from '../../vectors/Archived Driver button with Text.png';
import Passenger from '../../vectors/Passenger button with Text.png';
import ArchivedPassenger from '../../vectors/Archived Passenger button with Text.png';
import './SearchTicket.css';

export default class SearchTickets extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      ticket: {
        fromUCSD: true,
        isDriver: true,
        location: '',
        date: '',
        numOfSeats: '',
        price: '',
      }
    };
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
    this.setState({ loading: true });
    var db = firebase.firestore();
    db.collection('tickets')
      .get().then(querySnapshot => {
        var tickets = [];
        querySnapshot.forEach(doc => {
          let ticket = doc.data();
          ticket.id = doc.id;
          tickets.push(ticket);
        });
        this.props.history.push('/SearchResults', { tickets });
      });
  }

  render() {
    const { ticket, loading } = this.state;
    return (
      <div>
        <Loader loading={loading} />

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
          <div className="headline">I want to find a...</div>

          <div className="image-slot">
            <img
              alt="driver"
              src={ticket.isDriver ? Driver : ArchivedDriver}
              className="image-button selected"
              onClick={() => this.handleRoleSelect('driver')}
            />
            <img
              alt="passenger"
              src={ticket.isDriver ? ArchivedPassenger : Passenger}
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

          <div className="input-label">Min # of Available Seats</div>
          <input
            className="input"
            type="text"
            value={ticket.numOfSeats}
            placeholder="e.g. 3"
            onChange={e => this.updateTicket('numOfSeats', e)}
          />

          <div className="input-label">Max Acceptable Price</div>
          <input
            className="input"
            type="text"
            value={ticket.price}
            placeholder="e.g. 20 (Optional)"
            onChange={e => this.updateTicket('price', e)}
          />

          <button onClick={this.handleSubmit.bind(this)} className="submit">Search</button>
        </div>
      </div>
    );
  }
}
