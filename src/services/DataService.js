import firebase from '../firebase-config';

const events = firebase.ref("/events");

class DataService {
    getAllEvents() {
      return events;
    }

    getEvent(id) {
        var event = events.filter(function(event) {
            return event.id == id;
          });
    }
  
    createEvent(event) {
      return events.push(event);
    }
  
    update(key, value) {
      return events.child(key).update(value);
    }
  
    delete(key) {
      return events.child(key).remove();
    }
  
    deleteAll() {
      return events.remove();
    }
  }
  
  export default new TutorialDataService();
  