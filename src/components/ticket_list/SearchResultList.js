import React, { Component } from "react";
import NavBar from '../common/NavBar';
import ScrollableTicketList from "./ScrollableTicketList";
import "./SearchResultList.css";

export default class SearchResultList extends Component {
  render() {
    const { tickets } = this.props.location.state;
    return (
      <div className="app">
        <input type="checkbox" id="menustate" className="menustate" />
        <NavBar> Search Results </NavBar>

        <div className="bodyContent">
          <ScrollableTicketList tickets={tickets ? tickets : []} />
        </div>
      </div>
    );
  }
};
