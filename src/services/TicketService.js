import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * Description: This class serves as a bridge between components and database.
 * It belongs to the Model logical component among MVC. It is used primarily
 * by components dealing with tickets, such as PostTicket.js, TicketDetail.js,
 * and etc.
 */
class TicketService {
  static postTicket(ticket, callback=null) {
    var db = firebase.firestore();
    var ref = db.collection('tickets');
    ref.add({
      ...ticket,
      email: localStorage.getItem('email'),
      userName: localStorage.getItem('userName')
    })
    .then(callback);
  }

  static updateTicket(ticket, ticketId, callback=null) {
    var db = firebase.firestore();
    var ref = db.collection('tickets');
    ref.doc(ticketId)
      .update({ ...ticket })
      .then(callback);
  }

  static archiveTicket(ticketId, archived, callback=null) {
    firebase.firestore().collection('tickets').doc(ticketId)
      .update({
        archived: !archived
      })
      .then(callback);
  }
}

export default TicketService;
