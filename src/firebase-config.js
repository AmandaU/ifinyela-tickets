
import { firebase } from '@firebase/app'
//import * as firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/database";
import * as config from './config';

//
const firebaseapp = firebase.initializeApp(config.config);
export default firebase;
export const db = firebaseapp.database();


// firebase.initializeApp(config.config)

// // utils
// const db = firebase.database()
// const auth = firebase.auth()

// // collection references
// const eventsCollection = db.collection('events')

// // export utils/refs
// export {
//   db,
//   auth,
//   eventsCollection
// }