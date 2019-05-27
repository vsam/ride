import React from 'react';
import './TicketSelector.css';

export default class TicketSelector extends React.Component {
  handleSelect(fromUCSD) {
    this.props.onSelect(fromUCSD);
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
      </div>
    );
  }
}
