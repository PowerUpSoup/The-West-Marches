import React, { Component } from 'react';
import ApiContext from '../ApiContext.js';
import { Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import HomePage from '../HomePage/HomePage.js';
import InvitePlayerPage from '../InvitePlayerPage/InvitePlayerPage.js';
import NewCharacterCreation from '../NewCharacterCreation/NewCharacterCreation.js';
import NewNoticeForm from '../NewNoticeForm/NewNoticeForm.js';

import './App.css';

import STORE from '../dummy-store.js'

class App extends Component {
  state = {
    users: [],
    characters: [],
    notices: [],
    loggedInUser: [],
  };


  componentDidMount() {
    this.setState({
      users: STORE.users,
      characters: STORE.characters,
      notices: STORE.notices,
    })
  }

  updateLoggedInUser = loggedInUser => {
    this.setState({
      loggedInUser: loggedInUser,
    })
  }

  addUser = user => {
    this.setState({
      user: this.state.users.push(user)
    })
  }

  addCharacter = character => {
    this.setState({
      character: this.state.characters.push(character)
    })
  }

  addNotice = notice => {
    this.setState({
      notice: this.state.notices.push(notice)
    })
  }

  joinNotice = join => {
    let newNotices = []
    this.state.notices.forEach((notice) => {
      if (join.id === notice.id) {
        newNotices.push(join)
      } else {
        newNotices.push(notice)
      }
    })
    this.setState({
      notices: newNotices
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
        <Link to="/invite-player">Add New Player</Link>
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
    notices: this.state.notices,
    loggedInUser: this.state.loggedInUser,
    updateLoggedInUser: this.updateLoggedInUser,
    addUser: this.addUser,
    addCharacter: this.addCharacter,
    addNotice: this.addNotice,
    joinNotice: this.joinNotice,
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
          <Route exact path="/new-notice" component={NewNoticeForm} />
          <Route exact path="/invite-player" component={InvitePlayerPage} />
        </main>
      </div>
    </ApiContext.Provider>
  );
}
}

export default App;
