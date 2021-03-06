import React, { Component } from 'react';
import apiContext from '../ApiContext';

class Login extends Component {

    static contextType = apiContext;
    user = null;

    handleSubmitLogin = (e) => {
        e.preventDefault();
        const username = this.refs.loginUsername.value.toLowerCase();
        const password = this.refs.loginPassword.value;
        const { users = [] } = this.context;
        this.user = users.find(user => username === user.username) || ("Invalid Username or Password");
        if (this.user.password === password) {
            this.context.updateLoggedInUser(this.user);
            sessionStorage.setItem("user", JSON.stringify(this.user));
            this.props.history.push('/home');
            } else {
                this.showIncorrectPasswordMessage();
        };
    };

    hideIncorrectPasswordMessage() {
        const passwordMessage = document.querySelector('.incorrectUsernameOrPasswordMessage');

        passwordMessage.classList.add('hidden');
    };

    showIncorrectPasswordMessage() {
        const passwordMessage = document.querySelector('.incorrectUsernameOrPasswordMessage');

        passwordMessage.classList.remove('hidden');
    };

    render() {
        return (
            <div>
                <section className="splashPage" id="splash-page">
                    <p>This app is intended to help Dungeon Masters with too many players to easily coordinate. 'The West Marches' is a style of Dungeons and Dragons game where the players decide where they want to adventure to. <br />
                    The app has a noticeboard feature, where players can create notices with a message about what type of adventure they want to go on. Then other players can join the adventure, and when the Dungeon Master feels like the players are properly organized, they can pick up the adventure, signaling they are ready to meet up with their players and run the game. <br />
                    </p>
                    <header>
                        <h1>Welcome to the West Marches!</h1>
                    </header>
                    For the purposes of this demo, you can login as a Dungeon Master to add new players and pick up notices with username:admin password:admin <br />
                    You can log in as a player to create characters, create new notices, and join notices that already exist with username:player password:player
                </section>
                <section className="loginFormSection" id='login-form-section'>
                    <form id="login-form" onSubmit={(e) => {
                        this.handleSubmitLogin(e);
                    }}>
                        <div className="username">
                            <label >Username:</label>
                            <input type="text"
                                name="loginUsername"
                                placeholder="'Your Username Here'"
                                ref="loginUsername"
                                required />
                        </div>
                        <br />
                        <div className="password">
                            <label >Password:</label>
                            <input type="password"
                                name="loginPassword"
                                placeholder="'Your Username Here'"
                                ref="loginPassword"
                                required />
                        </div>
                        <button type="submit">Submit</button>
                        <p className="incorrectUsernameOrPasswordMessage hidden">Incorrect Username or Password, please try again</p>
                    </form>
                </section>
            </div>
        );
    };
};

export default Login;