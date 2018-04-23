import React, {Component} from 'react'

export default class Child extends Component{
  render() {
    let handleToUpdate = this.props.handleToUpdate;
    return(
      <div>
        <button onClick={() => handleToUpdate('algunaVar')}>presioname</button>
      </div>
    );
  }
}
