import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        var dialogDate = new DatePicker({
            type: 'date'
        });
        var toggleButton = document.getElementById('id-of-button-to-open-it');
        toggleButton.addEventListener('click', function() {
            dialogDate.toggle();
        });  
        return;
    }    
 
}
export default Calendar;