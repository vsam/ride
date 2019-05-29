import React, { Component } from 'react';
import './LaunchScreen.css';

class LaunchScreen extends Component {
  render(){
    return (
      <div className="home">
        <div id="title1">Ride+</div>
        <div id="title2">Better Travel Together</div>
        <div className="home-btnGroup">
          <button id="home-loginBtn"
            onClick={()=>this.props.history.push('/Login')}
          >Log In
          </button>
          <button id="home-signUpBtn"
            onClick={()=>this.props.history.push('/SignUp')}
          >Sign Up
          </button>
        </div>
      </div>
    )
  }
}

export default LaunchScreen;

