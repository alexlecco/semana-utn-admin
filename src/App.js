import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NewtalkForm from './components/NewtalkForm';
import TalksTable from './components/TalksTable';

import firebaseApp from './firebase';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      NewtalkFormVisible: false,
    };
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

        <a onClick={this.hideOrShowNewtalkForm.bind(this)}
           style={{cursor: 'pointer', color: 'blue'}}>
          { this.state.NewtalkFormVisible ? 'Ocultar Formulario' : 'Nueva charla' }
        </a>

        { this.state.NewtalkFormVisible ? <NewtalkForm /> : <div /> }

        <TalksTable />

      </div>
     );
  }
}