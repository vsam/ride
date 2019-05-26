import React from 'react';
import './TicketSelector.css';

export default class TicketSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromUCSD: true
    };
  }

  handleNavBarSelect(fromUCSD) {
    this.setState({ fromUCSD });

    var buttons = document.getElementsByClassName("tab-button");
    if (fromUCSD) {
      buttons[0].classList.add("selected");
      buttons[1].classList.remove("selected");
    } else {
      buttons[0].classList.remove("selected");
      buttons[1].classList.add("selected");
    }
  }

  render() {
    return (
      <div>
        <button
          className="tab-button selected"
          onClick={() => this.handleNavBarSelect(true)}
        >
          From UCSD
        </button>
        <button
          onClick={() => this.handleNavBarSelect(false)}
          className="tab-button"
        >
          To UCSD
        </button>
      </div>
    );
  }
}
