import React from 'react';
import NavBar from '../common/NavBar';
import './TicketDetail.css';

class TicketDetail extends React.Component {
  render() {
    return (
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> Ticket Detail </NavBar>

        <div className="ticket-content">
          <img
            alt="driver"
            src={require('../../images/driver button.png')}
            className="logo"
          />

          <div className="info">
            <div className="col info-left-col">
              <span className="elevated">5/5/19</span>
              <span className="reduced">3 seats available</span>
            </div>

            <div className="col info-right-col">
              <span className="eyebrow-elevated">$25.00</span>
              <span className="reduced">per person</span>
            </div>
          </div>

          <div className="route">
            <div className="address">
              <span className="marker circle"></span>
              <span>UCSD</span>
              <div className="separator"></div>
            </div>

            <div className="address">
              <span className="marker"></span>
              <span>San Jose</span>
            </div>
          </div>

          <div className="detail-info">
            <div className="eyebrow-elevated">Description</div>
            <div className="paragraph">
              I am driving to San Jose Municipal Garden. I will pass LA.
              So if you want to go to LA, you are also welcomed. If you
              want to go to SF, you need to contact me to discuss about
              additional payment. I can take at most 3 people. My trunk
              has no extra space so I basically cannot take large luggage.
            </div>
          </div>

          <div className="detail-info">
            <div className="eyebrow-elevated">Author</div>
            <div className="paragraph">Sam Vedernikoff</div>
          </div>

          <button className="email">Email svederni@ucsd.edu</button>
        </div>
      </div>
    );
  }
}

export default TicketDetail;