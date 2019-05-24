import React from 'react';
import './NavBar.css';

const hideMenu = () => {
  document.getElementById('menustate').checked = false;
  document.documentElement.classList.remove('noscroll');
  document.documentElement.classList.remove('noscroll-long');
}

export default function NavBar(props) {
  return (
    <nav id="globalnav">
      <div id="globalnav-bar">
        <ul className="globalnav-header">
          <li id="menuicon">
            <label className="menuicon-label" htmlFor="menustate" aria-hidden="true">
              <span className="menuicon-bread menuicon-bread-top">
                <span className="menuicon-bread-crust menuicon-bread-crust-top"></span>
              </span>
              <span className="menuicon-bread menuicon-bread-bottom">
                <span className="menuicon-bread-crust menuicon-bread-crust-bottom"></span>
              </span>
            </label>
          </li>
          <li id="nav-title">
            {props.children}
          </li>
        </ul>
        <ul className="globalnav-list">
          <li className="item-menu">
            <a href='/Home' onClick={hideMenu}>Home</a>
          </li>
          <li className="item-menu">
            <a href='/PostTicket' onClick={hideMenu}>Post Ticket</a>
          </li>
          <li className="item-menu">
            <a href='/Home' onClick={hideMenu}>Search Tickets</a>
          </li>
          <li className="item-menu">
            <a href='/Home' onClick={hideMenu}>Profile</a>
          </li>
          <li className="item-menu">
            <a href='TicketDetail' onClick={hideMenu}>My Ticket</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};