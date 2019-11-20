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
      sitesDropdownName: "Aula Magna",
      sitesDropdownId: "",
      sitesDropdownOpen: false,
      daysDropdownValue : "lunes",
      daysDropdownOpen: false,
      sites: [],
		}
    this.toggleDays = this.toggleDays.bind(this);
    this.toggleSites = this.toggleSites.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.selectSite = this.selectSite.bind(this);
    
    this.sitesRef = this.getRef().child('sites');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.sitesRef);
  }
  
  listenForItems(sitesRef) {
    sitesRef.on('value', snap => {
      let sites = [];
      snap.forEach((child) => {
        sites.push({
          id: child.val().id,
          name: child.val().name,
          _key: child.key
        });
      });
      this.setState({
        sites: sites
      });
    });
  }

  addTalk(event) {
    event.preventDefault(); // <- prevent form submit from reloading the page

    let site = {};
    let day = '';
    switch(this.state.daysDropdownValue) {
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
		if (this.inputTitle.value != '' & this.inputDescription.value != '' & this.inputTime.value != '')  {
			firebaseApp.database().ref('talks').push({
	      title: this.inputTitle.value,
				description: this.inputDescription.value,
	      day: day,
        time: this.inputTime.value,
        site: this.state.sitesDropdownId,
	    }).key;
			this.inputTitle.value = ''; // <- clear the input
	    this.inputDescription.value = ''; // <- clear the input
	    this.inputTime.value = ''; // <- clear the input
	    this.setState({daysDropdownValue: 'lunes'}); // <- reset state
		}
		else {
			let message = '';
			if (this.inputTitle.value === '') { message += 'Titulo vacio \n';}
			if (this.inputDescription.value === '') { message += 'Descripcion vacia \n';}
			if (this.inputTime.value === '') { message += 'Hora vacia \n';}

			alert(message);
		}
  }

	updateTalk() {
		alert('update');
	}

	render() {
    const { sites } = this.state

		return(
			<Form onSubmit={this.addTalk.bind(this)}>
          <div className="form-container">
              <h3>Nueva charla</h3>

              <FormGroup>
                <Label for="title">Titulo</Label>
                <Input id="title" type="text" innerRef={ title => this.inputTitle = title } />
              </FormGroup>

							<FormGroup>
								<Label for="description">Descripcion</Label>
								<Input id="description" type="text" innerRef={ description => this.inputDescription = description } />
							</FormGroup>

              <FormGroup>
                <Label for="day">Día</Label>
                <Dropdown id="day" 
                          isOpen={this.state.daysDropdownOpen}
                          toggle={this.toggleDays}
                          innerRef={ day => this.inputDay = day }>
                  <DropdownToggle> {this.state.daysDropdownValue} </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.selectDay}> lunes     </DropdownItem>
                    <DropdownItem onClick={this.selectDay}> martes    </DropdownItem>
                    <DropdownItem onClick={this.selectDay}> miercoles </DropdownItem>
                    <DropdownItem onClick={this.selectDay}> jueves    </DropdownItem>
                    <DropdownItem onClick={this.selectDay}> viernes   </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>


              <FormGroup>
                <Label for="time">Hora</Label>
                <Input id="time" placeholder="hora" type="time" innerRef={ time => this.inputTime = time } />
              </FormGroup>

              <FormGroup>
                <Label for="site">Aula</Label>
                <Dropdown id="site" 
                          isOpen={this.state.sitesDropdownOpen} 
                          toggle={this.toggleSites} 
                          innerRef={ site => this.inputSite = site }>
                  <DropdownToggle> {this.state.sitesDropdownName} </DropdownToggle>
                  <DropdownMenu>
                    {
                      sites.map(site => (
                        <DropdownItem key={site.id} onClick={() => this.selectSite(site)}> {site.name} </DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>

              <Button>Crear</Button>
            </div>
        </Form>
		);
	}

	toggleDays() {
    this.setState({
      daysDropdownOpen: !this.state.daysDropdownOpen
    });
  }

  toggleSites() {
    this.setState({
      sitesDropdownOpen: !this.state.sitesDropdownOpen
    });
  }

  selectDay(event) {
    console.log("DIA SELECCIONADO::::", event.target.innerText)
    this.setState({
      daysDropdownValue: event.target.innerText,
      daysDropdownOpen: !this.state.daysDropdownOpen,
    });
  }

  selectSite(site) {
    const formattedID = site.id.replace('site','');

    this.setState({
      sitesDropdownId: formattedID,
      sitesDropdownName: site.name,
      sitesDropdownOpen: !this.state.sitesDropdownOpen,
    });
  };
}
