import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebaseApp from './firebase';
import { 
  Button, Form, FormGroup, Label, Input,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talks: [],
      selectedDay: 'monday',
      dropdownOpen: false,
      dropdownValue : "lunes"
    };
    this.talksRef = this.getRef().child('talks').orderByChild('time');
    this.removeTalk = this.removeTalk.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
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

  addTalk(event) {
    event.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the talk to Firebase */
    console.log("CONSOLE.LOG::::",this.inputTitle.value,this.state.dropdownValue,this.inputTime.value);

    let day = '';
    switch(this.state.dropdownValue) {
      case 'lunes':
        day = 'monday';
        break;
      case 'martes':
        day = 'tuesday';
        break;
      case 'miercoles':
        day = 'wednesday';
        break;
      case 'jueves':
        day = 'thursday';
        break;
      case 'viernes':
        day = 'friday';
        break;
    }

    firebaseApp.database().ref('talks').push({
      title: this.inputTitle.value,
      day: day,
      time: this.inputTime.value,
    });
    this.inputTitle.value = ''; // <- clear the input
    this.inputTime.value = ''; // <- clear the input
    this.setState({dropdownValue: 'lunes'}); // <- reset state
  }

  handleChange(event) {
    this.setState({selectedDay: event.target.value});
  }

  removeTalk(key){
    firebaseApp.database().child('talks').child(key).remove();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Semana de la UTN - Admin </h1>
        </header>

        <Form onSubmit={this.addTalk.bind(this)}>
          <div className="form-container">
              <h3>Nueva charla</h3>

              <FormGroup>             
                <Label for="title">Titulo</Label>
                <Input id="title" type="text" innerRef={ title => this.inputTitle = title } />
              </FormGroup>
              
              <FormGroup>

                <Label for="day">Día</Label>
                <Dropdown id="day" isOpen={this.state.dropdownOpen} toggle={this.toggle} innerRef={ day => this.inputDay = day }>
                  <DropdownToggle> {this.state.dropdownValue} </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.select}> lunes     </DropdownItem>
                    <DropdownItem onClick={this.select}> martes    </DropdownItem>
                    <DropdownItem onClick={this.select}> miercoles </DropdownItem>
                    <DropdownItem onClick={this.select}> jueves    </DropdownItem>
                    <DropdownItem onClick={this.select}> viernes   </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>


              <FormGroup>
                <Label for="time">Hora</Label>
                <Input id="time" placeholder="hora" type="time" innerRef={ time => this.inputTime = time } />
              </FormGroup>

              <Button>Crear</Button>            
            </div>

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
              
        </Form>

      </div>
     );
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownValue: event.target.innerText,
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
}

export default App;