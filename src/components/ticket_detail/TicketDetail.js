import React from 'react';
import { Button } from 'react-bootstrap';
import './TicketDetail.css'

class TicketDetail extends React.Component {
  render() {
    return (
      <div>
        <div className="twoLabels">
          <div>
            <h1 className="customHeader">Description</h1>
            <p className="customText">someParatext to be pulled from the database afsodjfwiejfawfjwfawejwfaweifwa
            someParatext to be pulled from the database
            someParatext to be pulled from the database
          someParatext to be pulled from the database</p>
            <h1 className="customHeader">Author</h1>
            <p className="customText">author name</p>
          </div>
        </div>
        <div>
          <Button className="customButton">Email GG@ucsd.edu</Button>
        </div>
      </div>



    );
  }
}

export default TicketDetail;