import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PostTicket.css';
//import {Calendar} from './Calendar';
//import {Time} from './Time';

class Post extends React.Component {
  constructor() {
    super();    
    this.state = {
      rider: true,
      ticket: {
        fromUCSD: true,
        location: '',
        startDate: '',
        time: '',
        numOfSeats: '',
        price: '',
        description: '',
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  updateTicket(prop, event) {
    this.setState({
      ticket: {
        ...this.state.ticket,
        [prop]: event.target.value
      }
    });
  }

  handleNavBarSelect(rider) {
    var buttons = document.getElementsByClassName("tab-button");
    if (rider) {
      buttons[0].classList.add("selected");
      buttons[1].classList.remove("selected");
    } else {
      buttons[0].classList.remove("selected");
      buttons[1].classList.add("selected");
    }
  }

  handleRoleSelect(role) {
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

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleTimeChange(time) {
    this.setState({
      time: time
    });
  }

  handleSubmit() {
    firebase.firestore().collection('tickets').add(this.state.ticket);
  }

  render() {
    return (
      <div>
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
              src={require('../../images/driver button.png')}
              className="image-button selected"
              onClick={() => this.handleRoleSelect('driver')}
            />
            <img
              alt="passenger"
              src={require('../../images/passenger button.png')}
              className="image-button"
              onClick={() => this.handleRoleSelect('passenger')}
            />
          </div>

          <div className="input-label">Traveling from UCSD to</div>
          <input
            className="input"
            type="text"
            value={this.state.ticket.address}
            placeholder="Click to select an address"
            onChange={e => this.updateTicket('location', e)}
          />

          <div className="input-label">Date Leaving</div>
          <DatePicker
              placeholderText="Click to select a date"
              selected={this.state.startDate}
              onChange={this.handleDateChange}  
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              strictParsing
            />

          <div className="input-label">Time Leaving</div>
          <DatePicker
              placeholderText="Click to select a time"
              selected={this.state.time}
              onChange={this.handleTimeChange}
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
            value={this.state.ticket.numOfSeats}
            placeholder="Click to select number of people"
            onChange={e => this.updateTicket('numOfSeats', e)}
          />

          <div className="input-label">Desired Price</div>
          <input
            className="input"
            type="text"
            value={this.state.ticket.price}
            placeholder="Click to select a dollar amount"
            onChange={e => this.updateTicket('price', e)}
          />

          <div className="input-label">Description</div>
          <textarea
            rows="5"
            className="input"
            value={this.state.ticket.description}
            placeholder="Click to provide more information"
            onChange={e => this.updateTicket('description', e)}
          />

          <button onClick={this.handleSubmit.bind(this)} className="submit">Post</button>
        </div>
      </div>
    );
  }
}

export default Post;