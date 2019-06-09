import React from 'react';
import './NavBar.css';
import firebase from 'firebase';

const hideMenu = () => {
  document.getElementById('menustate').checked = false;
  document.documentElement.classList.remove('noscroll');
  document.documentElement.classList.remove('noscroll-long');
}

const logOut= () => {
  document.getElementById('menustate').checked = false;
  document.documentElement.classList.remove('noscroll');
  document.documentElement.classList.remove('noscroll-long');
  firebase.auth().signOut();
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
            <a href='/SearchTicket' onClick={hideMenu}>Search Ticket</a>
          </li>
          <li className="item-menu">
            <a href='/MyTickets' onClick={hideMenu}>My Tickets</a>
          </li>
          <li className="item-menu">
            <a href='/Profile' onClick={hideMenu}>Profile</a>
          </li>
          <li className="item-menu">
            <a href='/' onClick={logOut}>Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};