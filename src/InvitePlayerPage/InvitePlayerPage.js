import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

class InvitePlayerPage extends Component {

    static contextType = ApiContext;

    handleSubmitAddPlayerAccount(e) {
        e.preventDefault();
        const user = {
            "username": this.refs.playerUsername.value,
            "password": this.refs.playerPassword.value,
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
                this.props.history.push('/home')
            }).catch(error => {
                console.error({ error })
            })
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
                        required />
                    <label>Player Password:</label>
                    <input type="text"
                        name="create-password"
                        placeholder="player's password"
                        ref="playerPassword"
                        required />
                    <label>Player Email:</label>
                    <input type="text"
                        name="create-email"
                        placeholder="player's email"
                        ref="playerEmail"
                        required />
                    <label>Player Role:</label>
                    <select id="role-select"
                        ref="playerRole"
                        required>
                        <option value='player'>Player</option>
                        <option value='dungeon_master'>Dungeon Master</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}

export default InvitePlayerPage;