import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBkFWsGygllForJ1r4u9x3IcosoqBVCxq0",
  authDomain: "semana-utn-c9f91.firebaseapp.com",
  databaseURL: "https://semana-utn-c9f91.firebaseio.com",
  projectId: "semana-utn-c9f91",
  storageBucket: "semana-utn-c9f91.appspot.com",
  messagingSenderId: "385895562914"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseApp = firebase;
const auth = firebase.auth();
const db = firebase.database();

export {
  firebaseApp,
  auth,
  db,
  firebase,
};
