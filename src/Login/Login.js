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
        this.user = users.find(user => username === user.username) || ("Invalid Username or Password")
        if (this.user.password === password) {
            this.context.updateLoggedInUser(this.user)
            sessionStorage.setItem("user", JSON.stringify(this.user))
            this.props.history.push('/home')
            } else {
                return (null)
        }
    }

    hideIncorrectPasswordMessage() {
        const passwordMessage = document.querySelector('.incorrectUsernameOrPasswordMessage')

        passwordMessage.classList.add('hidden')
    }

    showIncorrectPasswordMessage() {
        const passwordMessage = document.querySelector('.incorrectUsernameOrPasswordMessage')

        passwordMessage.classList.remove('hidden')
    }

    render() {
        return (
            <div>
                <section id="splash-page">
                    <header>
                        <h1>Welcome to the West Marches!</h1>
                    </header>
                </section>
                <section id='login-form-section'>
                    <form id="login-form" onSubmit={(e) => {
                        this.handleSubmitLogin(e)
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
        )
    }
}

export default Login;