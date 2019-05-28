import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DatePicker from "react-datepicker";
import 'react-day-picker/lib/style.css';
import NavBar from '../common/NavBar';
import './Search.css';


class Search extends Component {
    constructor(props) {
		super(props);
        this.state = {
            selectedDay: undefined,
            rider: true,
            startTime: undefined,
            ticket: {
                fromUCSD: true,
                location: '',
                date: '',
                numOfSeats: '',
                price: '',
                description: '',
            }
        };
        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleNavBarSelect(rider) {
        var buttons = document.getElementsByClassName("tab-button");
        if (rider) {
            buttons[0].classList.add("selected");
            buttons[1].classList.remove("selected");
        } else {
            buttons[0].classList.remove("selected");
            buttons[1].classList.add("selected");
        }
    }

    handleRoleSelect(role) {
        var images = document.getElementsByClassName("image-button");
        switch (role) {
          case 'driver':
            images[0].classList.add("selected");
            images[1].classList.remove("selected");
            break;
          case 'passenger':
            images[0].classList.remove("selected");
            images[1].classList.add("selected");
            break;
          default:
            console.error('Unknown role.')
        }
    }

    updateTicket(prop, event) {
        this.setState({
            ticket: {
                ...this.state.ticket,
                [prop]: event.target.value
            }
        });
    }

    handleSubmit() {
        console.log("TODO: add filter functionality");
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
        console.log("The date is updated: " + day);
    }

    handleChange(time) {
        this.setState({startTime: time});
        console.log("The start time is updated: " + time);
    }

    render() {
        return (
            <div>
                <input type="checkbox" id="menustate" className="menustate" />
                <NavBar>
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
                </NavBar>
                <div className="form">
                    <div className="headline">I want to find a ...</div>
                    <div className="image-slot">
                        <img
                        alt="driver"
                        src={require('../../images/driver button.png')}
                        className="image-button selected"
                        onClick={() => this.handleRoleSelect('driver')}
                        />
                        <img
                        alt="passenger"
                        src={require('../../images/passenger button.png')}
                        className="image-button"
                        onClick={() => this.handleRoleSelect('passenger')}
                        />
                    </div>
                
                    <div className="input-label">Driving to UCSD from</div>
                    <input
                        className="input"
                        type="text"
                        value={this.state.ticket.address}
                        placeholder="Address"
                        onChange={e => this.updateTicket('location', e)}
                    />
                    <div className="input-label">Date of Departure</div>
                    <DayPickerInput 
                        onDayChange={this.handleDayClick}
                        dayPickerProps={{
                            month: new Date(2019, 4),
                            showWeekNumbers: true,
                            todayButton: 'Today',
                        }}
                    />
                    <div className="input-label">Time of Departure</div>
                    <DatePicker
                        selected={this.state.startTime}
                        onChange={this.handleChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        // timeCaption="Time"
                    />
                    <div className="input-label">Min # of Available Seats</div>
                    <input
                        className="input"
                        type="text"
                        value={this.state.ticket.numOfSeats}
                        placeholder="e.g. 3"
                        onChange={e => this.updateTicket('numOfSeats', e)}
                    />
                    <div className="input-label">Desired Price</div>
                    <input
                        className="input"
                        type="text"
                        value={this.state.ticket.price}
                        placeholder="e.g. 20"
                        onChange={e => this.updateTicket('price', e)}
                    />
                    <button onClick={this.handleSubmit.bind(this)} className="submit">Search</button>
                </div>
            </div>
        );
    }

}
export default Search;