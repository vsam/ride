import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import TicketSelector from '../common/TicketSelector';
import Driver from '../../vectors/Driver button with Text.png';
import ArchivedDriver from '../../vectors/Archived Driver button with Text.png';
import Passenger from '../../vectors/Passenger button with Text.png';
import ArchivedPassenger from '../../vectors/Archived Passenger button with Text.png';
import './SearchTicket.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class SearchTickets extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      ticket: {
        fromUCSD: true,
        isDriver: true,
        location: '',
        date: null,
        time: null,
        numOfSeats: '',
        price: '',
      }
    };
  }

  updateTicket(prop, value) {
    this.setState({
      ticket: {
        ...this.state.ticket,
        [prop]: value
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
    const { ticket } = this.state;
    var db = firebase.firestore();
    var ref = db.collection('tickets').where("archived", "==", false)
      .where("fromUCSD", "==", ticket.fromUCSD)
      .where("isDriver", "==", ticket.isDriver);

    if (ticket.location.length) {
      ref = ref.where("location", "==", ticket.location);
    }

    if (ticket.date) {
      ref = ref.where("date", "==", ticket.date);
    }
    
    if (ticket.time) {
      ref = ref.where("time", "==", ticket.time);
    }

    if (ticket.numOfSeats.length) {
      ref = ref.where("numOfSeats", "==", ticket.numOfSeats);
    }

    ref.get().then(querySnapshot => {
      var tickets = [];
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        if (!ticket.price.length || parseFloat(data.price) < parseFloat(ticket.price)) {
          tickets.push(data);
        }
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
          <TicketSelector onSelect={this.handleNavBarSelect.bind(this)} />
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
            onChange={e => this.updateTicket('location', e.target.value)}
          />

          <div className="input-label">Date Leaving</div>
          <DatePicker
            className="input"
            placeholderText="Click to select a date"
            selected={ticket.date}
            onChange={e => this.updateTicket('date', e)}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            strictParsing
          />

          <div className="input-label">Time Leaving</div>
          <DatePicker
            className="input"
            placeholderText="Click to select a time"
            selected={ticket.time}
            onChange={e => this.updateTicket('time', e)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="h:mm aa"
            timeCaption="Time"
            strictParsing
          />

          <div className="input-label">Min # of Available Seats</div>
          <input
            className="input"
            type="text"
            value={ticket.numOfSeats}
            placeholder="e.g. 3"
            onChange={e => this.updateTicket('numOfSeats', e.target.value)}
          />

          <div className="input-label">Max Acceptable Price</div>
          <input
            className="input"
            type="text"
            value={ticket.price}
            placeholder="e.g. 20"
            onChange={e => this.updateTicket('price', e.target.value)}
          />

          <button onClick={this.handleSubmit.bind(this)} className="submit">Search</button>
        </div>
      </div>
    );
  }
}
