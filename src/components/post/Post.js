import React from 'react';
import NavBar from '../common/NavBar';
import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <div>
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar>
          <button className="tab-button">From UCSD</button>
          <button className="tab-button">To UCSD</button>
        </NavBar>

        <div className="form">
          <div className="headline">I am a ...</div>

          <div className="image-slot">
            <img
              alt="driver"
              src={require('../../images/driver button.png')}
              className="logo"
            />
            <img
              alt="passenger"
              src={require('../../images/passenger button.png')}
              className="logo"
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