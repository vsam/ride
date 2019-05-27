import React from 'react';
//import firebase from 'firebase';
import NavBar from '../common/NavBar';
import './TicketDetail.css';

export default class TicketDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fromUCSD: true,
      location: 'San Jose',
      date: '5/5/19',
      numOfSeats: '3',
      price: '25.00',
      description:
      `I am driving to San Jose Municipal Garden. I will pass LA.
      So if you want to go to LA, you are also welcomed. If you
      want to go to SF, you need to contact me to discuss about
      additional payment. I can take at most 3 people. My trunk
      has no extra space so I basically cannot take large luggage.`,
      uid: 'GZDbitIXleNpvTeetv7bJSA4o692'
    };

    /*
    firebase.firestore().collection('tickets').doc('LN17FwxkrlMpvY5PlYce')
    .get().then(doc => {
      this.setState({ ...doc.data() });
    });
    */
  }

  render() {
    //pull current uid 
    var curruid = 'GZDbitIXleNpvTeetv7bJSA4o692'
    return (
  
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> Ticket Detail </NavBar>

        <div className="ticket-content">
          <img
            alt="driver"
            src={require('../../vectors/driver button.png')}
            className="logo"
          />

          <div className="info">
            <div className="col info-left-col">
              <span className="elevated">{this.state.date}</span>
              <span className="reduced">{`${this.state.numOfSeats} seats available`}</span>
            </div>

            <div className="col info-right-col">
              <span className="eyebrow-elevated">{`$${this.state.price}`}</span>
              <span className="reduced">per person</span>
            </div>
          </div>

          <div className="route">
            <div className="address">
              <span className="marker circle"></span>
              <span>{this.state.fromUCSD ? 'UCSD' : this.state.location}</span>
              <div className="separator"></div>
            </div>

            <div className="address">
              <span className="marker"></span>
              <span>{this.state.fromUCSD ? this.state.location : 'UCSD'}</span>
            </div>
          </div>

          <div className="detail-info">
            <div className="eyebrow-elevated">Description</div>
            <div className="paragraph">{this.state.description}}</div>
          </div>

          <div className="detail-info">
            <div className="eyebrow-elevated">Author</div>
            <div className="paragraph">Sam Vedernikoff</div>
          </div>

          <button className="email">
            {(curruid === this.state.uid) ? "update" : "email"}
          </button>
        </div>
      </div>
    );
  }
};

