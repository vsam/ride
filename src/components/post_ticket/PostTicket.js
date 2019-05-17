import React from 'react';
import NavBar from '../common/NavBar';
import './PostTicket.css';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      rider: true
    }
  }

  handleSelect(rider) {
    var buttons = document.getElementsByClassName("tab-button");
    var images = document.getElementsByClassName("image-button");
    
    if (rider) {
      buttons[0].classList.add("selected");
      buttons[1].classList.remove("selected");

      images[0].classList.add("selected");
      images[1].classList.remove("selected");
    } else {
      buttons[0].classList.remove("selected");
      buttons[1].classList.add("selected");

      images[0].classList.remove("selected");
      images[1].classList.add("selected");
    }
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <button
            className="tab-button selected"
            onClick={() => this.handleSelect(true)}
          >
            From UCSD
          </button>
          <button
            onClick={() => this.handleSelect(false)}
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
              onClick={() => this.handleSelect(true)}
            />
            <img
              alt="passenger"
              src={require('../../images/passenger button.png')}
              className="image-button"
              onClick={() => this.handleSelect(false)}
            />
          </div>

          <div className="input-label">Traveling from UCSD to</div>
          <input className="input" placeholder="Address"/>

          <div className="input-label">Departed on</div>
          <input className="input" placeholder="e.g. 5/13/19"/>

          <div className="input-label"># of people</div>
          <input className="input" placeholder="e.g. 3"/>

          <div className="input-label">Designed Price</div>
          <input className="input" placeholder="e.g. 20"/>

          <div className="input-label">Description</div>
          <textarea
            rows="5"
            className="input"
            placeholder="Specific Requirements."
          />

          <button className="submit">Post</button>
        </div>
      </div>
    );
  }
}

export default Post;