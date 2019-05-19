import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import './PostTicket.css';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      rider: true,
      ticket: {
        fromUCSD: true,
        location: '',
        date: '',
        numOfPeople: '',
        price: '',
        description: '',
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

  handleSubmit() {
    firebase.database().ref('tickets').set(this.state.ticket);
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
            placeholder="Address"
            onChange={e => this.updateTicket('location', e)}
          />

          <div className="input-label">Departed on</div>
          <input
            className="input"
            type="text"
            value={this.state.ticket.date}
            placeholder="e.g. 5/13/19"
            onChange={e => this.updateTicket('date', e)}
          />

          <div className="input-label"># of people</div>
          <input
            className="input"
            type="text"
            value={this.state.ticket.numOfPeople}
            placeholder="e.g. 3"
            onChange={e => this.updateTicket('numOfPeople', e)}
          />

          <div className="input-label">Designed Price</div>
          <input
            className="input"
            type="text"
            value={this.state.ticket.price}
            placeholder="e.g. 20"
            onChange={e => this.updateTicket('price', e)}
          />

          <div className="input-label">Description</div>
          <textarea
            rows="5"
            className="input"
            value={this.state.ticket.description}
            placeholder="Specific Requirements."
            onChange={e => this.updateTicket('description', e)}
          />

          <button className="submit">Post</button>
        </div>
      </div>
    );
  }
}

export default Post;