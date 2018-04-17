import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebaseApp from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  
  componentWillMount(){
    let messagesRef = firebaseApp.database().ref('messages').orderByKey().limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    firebaseApp.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Semana de la UTN - Admin </h1>
        </header>
        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
          <ul>
            { /* Render the list of messages */
              this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
            }
          </ul>
        </form>     
      </div>
     );
  }
}

export default App;