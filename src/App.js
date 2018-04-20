import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NewtalkForm from './NewtalkForm';

import firebaseApp from './firebase';
import { 
  Button, Form, FormGroup, Label, Input,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talks: [],
      selectedDay: 'monday',
      NewtalkFormVisible: false,
    };
    this.talksRef = this.getRef().child('talks').orderByChild('time');
    this.removeTalk = this.removeTalk.bind(this);
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
      let talks = [];

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

  handleChange(event) {
    this.setState({selectedDay: event.target.value});
  }

  removeTalk(key) {
    firebaseApp.database().child('talks').child(key).remove();
  }

  hideOrShowNewtalkForm() {
    this.setState({NewtalkFormVisible: !this.state.NewtalkFormVisible});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Semana de la UTN - Admin </h1>
        </header>

        <a onClick={this.hideOrShowNewtalkForm.bind(this)} style={{cursor: 'pointer', color: 'blue'}}>Nueva charla</a>

        { this.state.NewtalkFormVisible ? <NewtalkForm /> : <div /> }

        <div className="table-container">
          <h5>Charlas del día</h5>
          <select value={this.state.selectedDay} onChange={this.handleChange}>
            <option value="monday">Lunes</option>
            <option value="tuesday">Martes</option>
            <option value="wednesday">Miercoles</option>
            <option value="thursday">Jueves</option>
            <option value="friday">Viernes</option>
          </select>

          <Table striped>
            <thead>
              <tr>
                <th>hora</th>
                <th>titulo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.talks.map(
                  (talk) => {
                    if (talk.day === this.state.selectedDay) {
                      return(<tr>
                        <th scope="row"> {talk.time} </th>
                        <td> {talk.title} </td>
                        <td><a onClick={ () => {} } style={{cursor: 'pointer', color: 'blue'}}>modificar</a></td>
                        <td><a onClick={ () => firebaseApp.database().ref().child('talks').child(talk._key).remove() } style={{cursor: 'pointer', color: 'red'}}>eliminar</a></td>
                      </tr>)
                    }
                    else {
                      return(<div></div>)
                    }
                  }
                )
              }
            </tbody>
          </Table>
        </div>
            
      </div>
     );
  }
}