import React from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar';
import Loader from '../common/Loader';
import './TicketDetail.css';
import { generateKeyPair } from 'crypto';

export default class TicketDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: null
    };
    this.archivedStyle={}
    firebase.firestore().collection('tickets').doc(props.location.state.ticketId)
      .get().then(doc => {
        this.setState({ ticket: doc.data(), ticketId:doc.id});
      });
  }

  updateTicket(){
    this.props.history.push('/PostTicket', 
      {ticket:this.state.ticket, ticketId:this.state.ticketId});
  }

  archiveTicket(){
    const {ticket, ticketId} = this.state;
    firebase.firestore().collection('tickets').doc(ticketId)
      .update({
        archived: !ticket.archived
      });
      this.setState({
        ticket:{
          ...ticket,
          archived: !ticket.archived
        }
      })
  }

  renderTicket() {
    const { ticket } = this.state;
    if(ticket.archived){
      this.archivedStyle={}
    }
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
          <div className="paragraph">{this.state.ticket.userName}</div>
        </div>

        

        {localStorage.getItem("email") === this.state.ticket.email?
        (!ticket.archived?(<div className="authorBtns">
          <button className="update" onClick={this.updateTicket.bind(this)}>Update</button>
          <button className="archive" onClick={this.archiveTicket.bind(this)}>
            Archive</button>
            </div>)
          :<button className="unarchive" onClick={this.archiveTicket.bind(this)}>
          unarchive</button>)
        :<button className="email">Email {this.state.ticket.email}</button>
          
        }
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

