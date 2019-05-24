import React, { Component } from 'react';
import './LaunchScreen.css';

class LaunchScreen extends Component {
  render(){
    return (
      <div className="home">
        <img 
          src={require("../../images/Ride+.png")}
          alt="ride+"
          id="ride_logo"
        />
        <img 
          src={require("../../images/Better Travel Together.png")}
          alt="better"
          id="better_logo"
        />
        <div className="home-btnGroup">
          <button id="home-loginBtn"
            onClick={()=>this.props.history.push('/Login')}
          >Log In
          </button>
          <button id="home-signUpBtn"
            onClick={()=>this.props.history.push('/SignUp')}
          >Sign Up</button>
        </div>
      </div>
    )
  }
}

export default LaunchScreen;

