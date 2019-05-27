import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import Driver from '../../vectors/Driver button with Text.png';
import ArchivedDriver from '../../vectors/Archived Driver button with Text.png';
import Passenger from '../../vectors/Passenger button with Text.png';
import ArchivedPassenger from '../../vectors/Archived Passenger button with Text.png';
import './PostTicket.css';

export default class PostTicket extends React.Component {
  constructor(props) {
    super(props);

    //console.log(this.props.location.state.ticket)
    this.state = {
      loading: false,
      update: this.props.location.state !== undefined,
      ticket: this.props.location.state !== undefined?
      this.props.location.state.ticket
      :{
        fromUCSD: true,
        isDriver: true,
        location: '',
        date: '',
        numOfSeats: '',
        price: '',
        description: '',
        archived: false
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
    var ref = db.collection('tickets');
    if(!this.state.update){
      ref.add({...this.state.ticket, 
        email: firebase.auth().currentUser.email, 
        userName:localStorage.getItem('userName')
      })
      .then(() => {
        this.props.history.push('/MyTickets');
      });
    }else{
      ref.doc(this.props.location.state.ticketId)
      .update({...this.state.ticket})
      .then(() => {
        this.props.history.push('/MyTickets');
      });
    }
  }

  render() {
    const { ticket, loading, update} = this.state;
    return (
      <div>
        <Loader loading={loading}/>
        
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
            value={this.state.ticket.numOfSeats}
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

          <button onClick={this.handleSubmit.bind(this)} className="submit">
          {update?"Update":"Post"}</button>
        </div>
      </div>
    );
  }
};
