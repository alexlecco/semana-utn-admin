import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	Button, Form, FormGroup, Label, Input,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import firebaseApp from '../firebase';

export default class NewtalkForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
      dropdownOpen: false,
      dropdownOpen: false,
      dropdownValue : "lunes"
		}
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
	}

  addTalk(event) {
    event.preventDefault(); // <- prevent form submit from reloading the page

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

    /* Send the talk to Firebase */
    firebaseApp.database().ref('talks').push({
      title: this.inputTitle.value,
      day: day,
      time: this.inputTime.value,
    });
    this.inputTitle.value = ''; // <- clear the input
    this.inputTime.value = ''; // <- clear the input
    this.setState({dropdownValue: 'lunes'}); // <- reset state
  }

	render() {
		return(
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
        </Form>
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