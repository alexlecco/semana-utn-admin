import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	Button, Form, FormGroup, Label, Input,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import { firebaseApp } from '../firebase/firebase';

export default class UpdatetalkForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
      dropdownOpen: false,
      dropdownValue: "lunes",
			_key: props.talk._key,
			title: props.talk.title,
			description: props.talk.description,
			day: props.talk.day,
			time: props.talk.time,
		}
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
		console.log("Props EN constructor:", this.props, ". STATE EN constructor:", this.state);
	}

  updateTalk(event) {
    event.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the talk to Firebase */
		console.log("STATE EN UpdateTalk(event):", this.state);
    firebaseApp.database().ref().child('talks').child(this.state._key).update({
			title: this.state.title,
      description: this.state.description,
      day: this.state.day,
      time: this.state.time,
    });
		this.inputTitle.value = ''; // <- clear the input
    this.inputDescription.value = ''; // <- clear the input
    this.inputTime.value = ''; // <- clear the input
    this.setState({dropdownValue: 'lunes'}); // <- reset state
		this.props.hideOrShowUpdatetalkForm();
  }

	onTitleChange(value){
  	this.setState({title: value});
  }

	onDescriptionChange(value){
		this.setState({description: value});
	}

	onDayChange(value){
		this.setState({day: value});
	}

	onTimeChange(value) {
		this.setState({time: value});
	}

	render() {
		let { title, description, day, time, _key } = this.props.talk;
		let hideOrShowUpdatetalkForm = this.props.hideOrShowUpdatetalkForm;
		//console.log("LOG EN RENDER DE UpdatetalkForm: KEY", key);
		console.log("PROPS EN RENDER DE UpdatetalkForm:", this.props);
		return(
			<Form onSubmit={this.updateTalk.bind(this)}>
          <div className="form-container">
              <h3>Modificar charla</h3>

              <FormGroup>
                <Label for="title">Titulo</Label>
                <Input id="title" type="text" value={this.state.title} innerRef={ title => this.inputTitle = title }
											 onChange={ e => this.onTitleChange(e.target.value) } />
              </FormGroup>

							<FormGroup>
								<Label for="description">Descripcion</Label>
								<Input id="description" type="text" value={this.state.description} innerRef={ description => this.inputDescription = description } onChange={ e => this.onDescriptionChange(e.target.value) } />
							</FormGroup>

              <FormGroup>
                <Label for="day">Día</Label>
                <Dropdown id="day" isOpen={this.state.dropdownOpen} toggle={this.toggle} innerRef={ day => this.inputDay = day } >
                  <DropdownToggle> { this.state.day } </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.select}> lunes     </DropdownItem>
                    <DropdownItem onClick={this.select}> martes    </DropdownItem>
                    <DropdownItem onClick={this.select}> miercoles </DropdownItem>
                    <DropdownItem onClick={this.select}> jueves  	 </DropdownItem>
                    <DropdownItem onClick={this.select}> viernes 	 </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>

              <FormGroup>
                <Label for="time">Hora</Label>
                <Input id="time" value={this.state.time} type="time" innerRef={ time => this.inputTime = time }
											 onChange={ e => this.onTimeChange(e.target.value) } />
              </FormGroup>

              <Button>Confirmar</Button>
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
		let day = '';
	    switch(event.target.innerText) {
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

    this.setState({
      dropdownValue: event.target.innerText,
			day: day,
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
}
