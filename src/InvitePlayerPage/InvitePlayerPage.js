import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class InvitePlayerPage extends Component {

    static contextType = ApiContext;

    handleSubmitAddPlayerAccount(e) {
        e.preventDefault();
        const user = {
            "username": this.refs.playerUsername.value.toLowerCase(),
            "password": this.refs.playerPassword.value.toLowerCase(),
            "email_address": this.refs.playerEmail.value,
            "role": this.refs.playerRole.value
        }
        fetch(`${config.API_BASE_URL}/users`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ username:user.username, password:user.password, email_address:user.email_address, role:user.role })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.context.addUser(data)
                this.showInviteSuccessMessage()
            }).catch(error => {
                console.error({ error })
            })
        }
    
        showInviteSuccessMessage() {
            const InviteSuccessMessage = document.querySelector('.inviteSuccessMessage')
    
            InviteSuccessMessage.classList.remove('hidden')
        }

    render() {

        return (
            <div>
                <form onSubmit={(e) => {
                    this.handleSubmitAddPlayerAccount(e)
                }}>
                    <label>Player Name:</label>
                    <input type="text"
                        name="create-username"
                        placeholder="player's name"
                        ref="playerUsername"
                        required /> <br />
                    <label>Player Password:</label>
                    <input type="text"
                        name="create-password"
                        placeholder="player's password"
                        ref="playerPassword"
                        required /> <br />
                    <label>Player Email:</label>
                    <input type="text"
                        name="create-email"
                        placeholder="player's email"
                        ref="playerEmail"
                        required /> <br />
                    <label>Player Role:</label>
                    <select id="role-select"
                        ref="playerRole"
                        required>
                        <option value='player'>Player</option>
                        <option value='dungeon_master'>Dungeon Master</option>
                    </select> <br />
                    <button type="submit">Submit</button>
                </form>
                <section className="inviteSuccessMessage hidden">
                    <p>Player Successfully Added</p>
                    <Link className="invitePlayerMessageHomeButton" to="/home">Return to Home</Link>
                </section>
            </div>
        )
    }

}

export default InvitePlayerPage;