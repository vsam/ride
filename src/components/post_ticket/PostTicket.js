import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import TicketSelector from '../common/TicketSelector';
import Driver from '../../vectors/Driver button with Text.png';
import ArchivedDriver from '../../vectors/Archived Driver button with Text.png';
import Passenger from '../../vectors/Passenger button with Text.png';
import ArchivedPassenger from '../../vectors/Archived Passenger button with Text.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PostTicket.css';

export default class PostTicket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      ticket: {
        fromUCSD: true,
        isDriver: true,
        location: '',
        date: new Date(),
        time: new Date(),
        numOfSeats: '',
        price: '',
        description: '',
        archived: false
      },
      ...props.location.state
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
    const { ticket } = this.state;
    if (!ticket.location.length || !ticket.numOfSeats.length || !ticket.price.length) {
      var el = document.getElementById("warning-container");
      el.classList.add("warning");
      return;
    }

    this.setState({ loading: true });
    var db = firebase.firestore();
    var ref = db.collection('tickets');
    if (!this.state.ticketId) {
      ref.add({
        ...this.state.ticket,
        email: firebase.auth().currentUser.email,
        userName: localStorage.getItem('userName')
      })
        .then(() => {
          this.props.history.push('/MyTickets');
        });
    } else {
      ref.doc(this.props.location.state.ticketId)
        .update({ ...this.state.ticket })
        .then(() => {
          this.props.history.push('/MyTickets');
        });
    }
  }

  render() {
    const { ticket, loading, update } = this.state;
    return (
      <div id="warning-container">
        <Loader loading={loading} />

        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <TicketSelector onSelect={this.handleNavBarSelect.bind(this)} />
        </NavBar>

        <div className="form">
          <div className="headline">I am a ...</div>

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
            {(ticket.isDriver ? "Driving " : "Traveling ")
              + (ticket.fromUCSD ? "from UCSD to" : "to UCSD from")}
          </div>
          <input
            className="input"
            type="text"
            value={ticket.location}
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

          <div className="input-label"># of people</div>
          <input
            className="input"
            type="text"
            value={ticket.numOfSeats}
            placeholder="e.g. 3"
            onChange={e => this.updateTicket('numOfSeats', e.target.value)}
          />

          <div className="input-label">Designed Price</div>
          <input
            className="input"
            type="text"
            value={ticket.price}
            placeholder="e.g. 20"
            onChange={e => this.updateTicket('price', e.target.value)}
          />

          <div className="input-label">Description</div>
          <textarea
            rows="5"
            className="input"
            value={ticket.description}
            placeholder="Specific Requirements (Optional)."
            onChange={e => this.updateTicket('description', e.target.value)}
          />

          <button onClick={this.handleSubmit.bind(this)} className="submit">
            {update ? "Update" : "Post"}
          </button>
        </div>
      </div>
    );
  }
};
