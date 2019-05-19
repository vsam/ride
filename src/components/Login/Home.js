import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  render(){
    return (
      <div className="home">
        <h1 className="title1">Ride+</h1>
        <h4 className="title2">Better Travel Together</h4>
        <div className="btnGroup">
          <button className="loginBtn"
            onClick={()=>this.props.history.push('/Login')}
          >Log In</button>
          <button className="loginBtn"
            onClick={()=>this.props.history.push('/SignUp')}
          >Sign Up</button>
        </div>
      </div>
    )
  }
}

export default Home;

