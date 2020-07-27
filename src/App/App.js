import React, { Component } from 'react';
import ApiContext from '../ApiContext.js';
import { Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import HomePage from '../HomePage/HomePage.js';
import InvitePlayerPage from '../InvitePlayerPage/InvitePlayerPage.js';
import NewCharacterCreation from '../NewCharacterCreation/NewCharacterCreation.js';
import NewNoticeForm from '../NewNoticeForm/NewNoticeForm.js';
import config from '../config';

import './App.css';

class App extends Component {
  state = {
    users: [],
    characters: [],
    notices: [],
    noticePlayers: [],
    noticeCharacters: [],
  };


  componentDidMount() {
    Promise.all([
      fetch(`${config.API_BASE_URL}/users`),
      fetch(`${config.API_BASE_URL}/characters`),
      fetch(`${config.API_BASE_URL}/notices`),
      fetch(`${config.API_BASE_URL}/notices/players`),
      fetch(`${config.API_BASE_URL}/notices/characters`)
    ])
      .then(([usersRes, charactersRes, noticesRes, noticePlayersRes, noticeCharactersRes]) => {

        if (!usersRes.ok)
          return usersRes.json().then(e => Promise.reject(e));
        if (!charactersRes.ok)
          return charactersRes.json().then(e => Promise.reject(e));
        if (!noticesRes.ok)
          return noticesRes.json().then(e => Promise.reject(e));
        if (!noticePlayersRes.ok)
          return noticePlayersRes.json().then(e => Promise.reject(e));
        if (!noticeCharactersRes.ok)
          return noticeCharactersRes.json().then(e => Promise.reject(e));

        return Promise.all([usersRes.json(), charactersRes.json(), noticesRes.json(), noticePlayersRes.json(), noticeCharactersRes.json()]);
      })
      .then(([users, characters, notices, noticePlayers, noticeCharacters]) => {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))
        this.setState({ users, characters, notices, noticePlayers, noticeCharacters, loggedInUser: sessionStorageUser });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  logOutUser() {
    sessionStorage.clear();
    this.setState({
      loggedInUser: null
    });
  };

  updateLoggedInUser = user => {
    this.setState({
      loggedInUser: user
    });
  };

  addUser = user => {
    this.setState({
      user: this.state.users.push(user)
    });
  };

  addCharacter = character => {
    this.setState({
      character: this.state.characters.push(character)
    });
  };

  addNotice = notice => {
    this.setState({
      notice: this.state.notices.push(notice)
    });
  };

  addNoticePlayer = noticePlayer => {
    this.setState({
      noticePlayer: this.state.noticePlayers.push(noticePlayer)
    });
  };

  addNoticeCharacter = noticeCharacter => {
    this.setState({
      noticeCharacter: this.state.noticeCharacters.push(noticeCharacter)
    });
  };

  joinNotice = join => {
    let newNotices = [];
    this.state.notices.forEach((notice) => {
      if (join.id === notice.id) {
        newNotices.push(join);
      } else {
        newNotices.push(notice);
      }
    });
    this.setState({
      notices: newNotices
    });
  };

  renderNav() {
    if (this.state.loggedInUser.role === 'dungeon_master') {
      return (
        <nav className="DM-Nav">
          <Link to="/home">Home</Link>
          <Link to="/invite-player">Add New Player</Link>
          <Link to="/" onClick={() => this.logOutUser()}>Logout</Link>
        </nav>
      );
    } if (this.state.loggedInUser.role === 'player') {
      return (
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/" onClick={() => this.logOutUser()}>Logout</Link>
        </nav>
      );
    } else {
      return (null);
    };
  };

  render() {
    const value = {
      users: this.state.users,
      characters: this.state.characters,
      notices: this.state.notices,
      noticePlayers: this.state.noticePlayers,
      noticeCharacters: this.state.noticeCharacters,
      updateLoggedInUser: this.updateLoggedInUser,
      addUser: this.addUser,
      addCharacter: this.addCharacter,
      addNotice: this.addNotice,
      addNoticePlayer: this.addNoticePlayer,
      addNoticeCharacter: this.addNoticeCharacter,
      joinNotice: this.joinNotice,
      logOutUser: this.logOutUser,
    };

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
  };
};

export default App;
