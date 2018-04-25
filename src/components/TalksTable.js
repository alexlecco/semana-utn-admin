import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { firebaseApp } from '../firebase/firebase';

export default class TalksTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
      selectedDay: 'monday',
      talks: [],
		}
    this.handleChange = this.handleChange.bind(this);
    this.talksRef = this.getRef().child('talks').orderByChild('time');
    this.removeTalk = this.removeTalk.bind(this);
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
          time: child.val().time,
					title: child.val().title,
          description: child.val().description,
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

  removeTalk(talk) {
    this.getRef().child('talks').child(talk._key).remove()
  }

	render() {
		let handleToUpdate = this.props.handleToUpdate;
		console.log("PROPS EN RENDER DE TalksTable:", this.props);
		return(
			<div>
	      <div className="table-container">
	        <h5>Charlas del día</h5>
	        <select value={this.state.selectedDay} onChange={this.handleChange}>
	          <option value="monday">Lunes</option>
	          <option value="tuesday">Martes</option>
	          <option value="wednesday">Miercoles</option>
	          <option value="thursday">Jueves</option>
	          <option value="friday">Viernes</option>
	        </select>

					<br />
					<br />

					<Table striped hover>
		        <thead>
		          <tr>
		            <th>hora</th>
								<th>titulo</th>
		            <th>descripcion</th>
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
		                    <td> {talk.description} </td>
		                    <td><a onClick={ () => handleToUpdate(talk) }
		                           style={{cursor: 'pointer', color: 'blue'}}>
		                      modificar
		                    </a></td>
		                    <td><a onClick={ () => this.removeTalk(talk) }
		                           style={{cursor: 'pointer', color: 'red'}}>
		                      eliminar
		                    </a></td>
		                  </tr>)
		                }
		                else {
		                  return(<div />)
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
