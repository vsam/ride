import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import './TicketDetail.css';

export default class TicketDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: null
    };

    firebase.firestore().collection('tickets').doc(props.location.state.ticketId)
      .get().then(doc => {
        this.setState({ ticket: doc.data() });
      });
  }

  renderTicket() {
    const { ticket } = this.state;
    return (
      <div className="ticket-content">
        <img
          alt="driver"
          src={require('../../vectors/driver button.png')}
          className="logo"
        />

        <div className="info">
          <div className="col info-left-col">
            <span className="elevated">{ticket.date}</span>
            <span className="reduced">{`${ticket.numOfSeats} seats available`}</span>
          </div>

          <div className="col info-right-col">
            <span className="eyebrow-elevated">{`$${ticket.price}`}</span>
            <span className="reduced">per person</span>
          </div>
        </div>

        <div className="route">
          <div className="address">
            <span className="marker circle"></span>
            <span>{ticket.fromUCSD ? 'UCSD' : ticket.location}</span>
            <div className="separator"></div>
          </div>

          <div className="address">
            <span className="marker"></span>
            <span>{ticket.fromUCSD ? ticket.location : 'UCSD'}</span>
          </div>
        </div>

        <div className="detail-info">
          <div className="eyebrow-elevated">Description</div>
          <div className="paragraph">{ticket.description}}</div>
        </div>

        <div className="detail-info">
          <div className="eyebrow-elevated">Author</div>
          <div className="paragraph">Sam Vedernikoff</div>
        </div>

        <button className="email">Email svederni@ucsd.edu</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> Ticket Detail </NavBar>
        {this.state.ticket && this.renderTicket()}
        <Loader loading={!this.state.ticket}/>
      </div>
    );
  }
};

