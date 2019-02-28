import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import UserEntry from './Components/UserEntry';

class App extends Component {
  
    

  render() {
    return (
      <div className="App">
        <UserEntry />
      </div>
    );
  }
}

export default App;
