import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebaseApp from './firebase';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talks: [],
      selectedDay: 'monday'
    };
    this.talksRef = this.getRef().child('talks').orderByChild('time');

    this.handleChange = this.handleChange.bind(this);
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
      title: this.inputTitle.value,
      day: this.inputDay.value,
      time: this.inputTime.value,
    });
    this.inputTitle.value = ''; // <- clear the input
    this.inputTime.value = ''; // <- clear the input
  }

  handleChange(event) {
    this.setState({selectedDay: event.target.value});
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Semana de la UTN - Admin </h1>
        </header>

        <Form onSubmit={this.addTalk.bind(this)}>
          <div className="container">

            <h3>Nueva charla</h3>
            <input placeholder="titulo" type="text" ref={ title => this.inputTitle = title } />
            <select ref={ day => this.inputDay = day }>
              <option value="monday">Lunes</option>
              <option value="tuesday">Martes</option>
              <option value="wednesday">Miercoles</option>
              <option value="thursday">Jueves</option>
              <option value="friday">Viernes</option>
            </select>
            <input placeholder="hora" type="time" pattern="(?:[01]|2(?![4-9])){1}\d{1}:[0-5]{1}\d{1}" ref={ time => this.inputTime = time } class="without_ampm" />
            <input type="submit" value="Crear" />
            <br />
            <br />
            <br />

            <h5>Charlas del día</h5>
            <select value={this.state.selectedDay} onChange={this.handleChange}>
              <option value="monday">Lunes</option>
              <option value="tuesday">Martes</option>
              <option value="wednesday">Miercoles</option>
              <option value="thursday">Jueves</option>
              <option value="friday">Viernes</option>
            </select>

          </div>
          <ul>
            { /* Render the list of talks */
              this.state.talks.map(
                talk => talk.day == this.state.selectedDay ?
                  <li key={talk.id}> {talk.title} </li> :
                  <div></div>
              )
            }
          </ul>
        </Form>

      </div>
     );
  }
}

export default App;