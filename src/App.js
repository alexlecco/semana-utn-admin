import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebaseApp from './firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talks: []
    };
    this.talksRef = this.getRef().child('talks');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.talksRef);
  }

  listenForItems(talksRef) {
    talksRef.on('value', snap => {

      // get children as an array
      var talks = [];

      snap.forEach((child) => {
        talks.push({

          day: child.val().day,
          id: child.val().id,
          time: child.val().time,
          title: child.val().title,
          _key: child.key

        });
      });

      this.setState({
        talks: talks
      });

    });
  }

  addTalk(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the talk to Firebase */
    firebaseApp.database().ref('talks').push({
      day: this.inputDay.value,
      time: this.inputTime.value,
      title: this.inputTitle.value
    });
    this.inputDay.value = ''; // <- clear the input
    this.inputTime.value = ''; // <- clear the input
    this.inputTitle.value = ''; // <- clear the input
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Semana de la UTN - Admin </h1>
        </header>

        <form onSubmit={this.addTalk.bind(this)}>
          <input placeholder="titulo" type="text" ref={ title => this.inputTitle = title } />
          <br />
          <input placeholder="dia"    type="text" ref={ day => this.inputDay = day } />
          <br />
          <input placeholder="hora"   type="text" ref={ time => this.inputTime = time } />
          <br />
          <br />
          <input type="submit" />
          <ul>
            { /* Render the list of messages */
              this.state.talks.map( talk => <li key={talk.id}> {talk.title} </li> )
            }
          </ul>
        </form>

      </div>
     );
  }
}

export default App;