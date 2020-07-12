import React, { Component } from 'react';
import apiContext from '../ApiContext';
import config from '../config';

class NewCharacterCreation extends Component {

    static contextType = apiContext;

    handleSubmitCharacterCreate = (e) => {
        e.preventDefault();
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))
        const character = {
            "user_id": sessionStorageUser.id,
            "name": this.refs.characterUsername.value.toLowerCase()
        }
        fetch(`${config.API_BASE_URL}/characters`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ user_id:character.user_id, name:character.name })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.context.addCharacter(data)
                this.props.history.push('/home')
            }).catch(error => {
                console.error({ error })
            })
        }

    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    this.handleSubmitCharacterCreate(e)
                }}>
                    <label>Character Name:</label>
                    <input type="text"
                        name="create-username"
                        placeholder="Charater Name:"
                        ref="characterUsername"
                        required />
                </form>
            </div>
        )
    }
}

export default NewCharacterCreation;