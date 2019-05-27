import React from "react";
import NavBar from '../common/NavBar';
import ScrollableTicketList from "./ScrollableTicketList";
import "./TicketList.css";

export default function SearchResultList(props) {
  const { tickets } = props.location.state;
  return (
    <div className="app">
      <input type="checkbox" id="menustate" className="menustate" />
      <NavBar> Search Results </NavBar>

      <div className="bodyContent">
        <ScrollableTicketList
          tickets={tickets ? tickets : []}
          history={props.history}
        />
      </div>
    </div>
  );
};
