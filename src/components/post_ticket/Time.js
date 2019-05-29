import React from 'react';
import TimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class Time extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        var dialogTime = new TimePicker({
            type: 'time'
        });
        var toggleButton = document.getElementById('id-of-button-to-open-it');
        toggleButton.addEventListener('click', function() {
            dialogTime.toggle();
        });
        return;
    }
   
}
export default Time;
