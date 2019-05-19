import React, {Component}from 'react';
import './WelcomeScreen.css'

class Welcome extends Component {
  render(){
    return(
      <div className="welcome-container">
        <div className="welcome-title">Welcome To Ride</div>
        <div>
          <img 
            src={require('../../images/CSE110_LOGO.png')} 
            alt="logo"
            id="logo_img"
            />
          <div className="title2">An affordable and safe solution of traveling to and from UCSD</div>
        </div>

        <div className="safe-group">
          <img 
            src={require('../../images/safe.png')} 
            alt="history"
            id="safe_img"/>
          <div id="safe_text"> Both drivers and passengers have to be UCSD students</div>
        </div>
        <div className="money-group">
          <img 
            src={require('../../images/money.png')} 
            alt="money" 
            id="money_img"/>
          <div id="money_text"> Save money and make new friends on your trip</div>
        </div>
        <div className="history-group">
          <img 
            src={require('../../images/history.png')} 
            alt="history"
            id="history_img"/>
          <div id="history_text"> Easily keep track of your appointment trips</div>
        </div>

        <div>
          A confirmation email has been sent to your UCSD email address. 
          Please use the link in the email to complete the registration
        </div>
      </div>
    )
  }
}

export default Welcome
