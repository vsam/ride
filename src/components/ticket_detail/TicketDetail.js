import React from 'react';
import firebase from 'firebase';
import driver from '../../vectors/driver button.png';
import passenger from '../../vectors/passenger button.png';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import './TicketDetail.css';

export default class TicketDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: null
    };
    this.archivedStyle = {}
    firebase.firestore().collection('tickets').doc(props.location.state.ticketId)
      .get().then(doc => {
        this.setState({ ticket: doc.data(), ticketId: doc.id });
      });
  }

  updateTicket() {
    this.props.history.push('/PostTicket',
      { ticket: this.state.ticket, ticketId: this.state.ticketId });
  }

  archiveTicket() {
    const { ticket, ticketId } = this.state;
    firebase.firestore().collection('tickets').doc(ticketId)
      .update({
        archived: !ticket.archived
      });
    this.setState({
      ticket: {
        ...ticket,
        archived: !ticket.archived
      }
    })
  }

  renderButton() {
    if (localStorage.getItem("email") !== this.state.ticket.email) {
      return (
        <button className="email">Email {this.state.ticket.email}</button>
      );
    }

    if (this.state.ticket.archived) {
      return (
        <button className="unarchive" onClick={this.archiveTicket.bind(this)}>
          unarchive
        </button>
      );
    }

    return (
      <div className="authorBtns">
        <button className="update" onClick={this.updateTicket.bind(this)}>Update</button>
        <button className="archive" onClick={this.archiveTicket.bind(this)}>
          Archive
        </button>
      </div>
    )
  }

  renderTicket() {
    const { ticket } = this.state;
    if (ticket.archived) {
      this.archivedStyle = {}
    }
    return (
      <div className="ticket-content"
        style={this.archivedStyle}>
        <img
          alt="driver"
          src={ticket.isDriver ? driver : passenger}
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
          <div className="paragraph">{ticket.description}</div>
        </div>

        <div className="detail-info">
          <div className="eyebrow-elevated">Author</div>
          <div className="paragraph">{this.state.ticket.userName}</div>
        </div>

        {this.renderButton()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> Ticket Detail </NavBar>
        {this.state.ticket && this.renderTicket()}
        <Loader loading={!this.state.ticket} />
      </div>
    );
  }
};

