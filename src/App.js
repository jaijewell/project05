import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Header from './Components/Header'
import UserEntry from './Components/UserEntry';
import Footer from './Components/Footer'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <UserEntry />
        <Footer />
      </div>
    );
  }
}

export default App;
