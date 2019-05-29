



class Calender extends React.Component {

    constructor(){
        super();

        var dialog = new mdDateTimePicker.default({
            type: 'date'
        });
        var toggleButton = document.getElementById('id-of-button-to-open-it');
        toggleButton.addEventListener('click', function() {
            dialog.toggle();
        });

    }


}