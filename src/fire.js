import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBkFWsGygllForJ1r4u9x3IcosoqBVCxq0",
  authDomain: "semana-utn-c9f91.firebaseapp.com",
  databaseURL: "https://semana-utn-c9f91.firebaseio.com",
  projectId: "semana-utn-c9f91",
  storageBucket: "semana-utn-c9f91.appspot.com",
  messagingSenderId: "385895562914"
};
var firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;