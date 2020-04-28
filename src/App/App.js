import React, { Component } from 'react';
import ApiContext from '../ApiContext.js';
import { Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import HomePage from '../HomePage/HomePage.js';
import NewCharacterCreation from '../NewCharacterCreation/NewCharacterCreation.js';

import './App.css';

import STORE from '../dummy-store.js'

class App extends Component {
  state = {
    users: [],
    characters: [],
    loggedInUser: [],
  };


  componentDidMount() {
    this.setState({
      users: STORE.users,
      characters: STORE.characters,
    })
  }

  updateLoggedInUser = loggedInUser => {
    this.setState({
      loggedInUser: loggedInUser,
    })
  }

  addCharacter = character => {
    this.setState({
      character: this.state.characters.push(character)
    })
  }

  logOutUser() {
    this.setState({
      loggedInUser: null,
    })
  }

  renderNav() {

    if (this.state.loggedInUser.role === 'dungeon_master') {
      return (
        <nav className="DM-Nav">
          <Link to="/home">Home</Link>
          <Link to="/invite-player">Invite New Player</Link>
          <Link to="/" onClick={() => this.logOutUser()}>Logout</Link>
        </nav>
      )
    } if (this.state.loggedInUser.role === 'player') {
      return (
        <nav>
          <Link to="/" onClick={() => this.logOutUser()}>Logout</Link>
        </nav>
      )
    } else {
      return (null)
    }
  }

  render() {

    const value = {
      users: this.state.users,
      characters: this.state.characters,
      loggedInUser: this.state.loggedInUser,
      updateLoggedInUser: this.updateLoggedInUser,
      addCharacter: this.addCharacter,
      logOutUser: this.logOutUser,
    }

    return (

      <ApiContext.Provider value={value}>
        <div className="App">
          {this.state.loggedInUser
            ? (this.renderNav())
            : (null)}
          <main role="main">
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/new-character" component={NewCharacterCreation} />
            {/* <Route exact path="/notice-board" component={NewNoticeForm} />
            <Route exact path="/notes/:section_id" component={NotesPage} />  
            <Route exact path="/invite-player" component={InvitePlayerPage */}
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
