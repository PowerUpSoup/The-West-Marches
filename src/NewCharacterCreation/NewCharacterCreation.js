import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import apiContext from '../ApiContext';
import config from '../config';

class NewCharacterCreation extends Component {

    static contextType = apiContext;

    handleSubmitCharacterCreate = (e) => {
        e.preventDefault();
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
        const character = {
            "user_id": sessionStorageUser.id,
            "name": this.refs.characterUsername.value
        };
        fetch(`${config.API_BASE_URL}/characters`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ user_id:character.user_id, name:character.name })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e));
            return res.json();
        })
            .then((data) => {
                this.context.addCharacter(data);
                this.showInviteSuccessMessage();
            }).catch(error => {
                console.error({ error });
            });
        };

        showInviteSuccessMessage() {
            const InviteSuccessMessage = document.querySelector('.createCharacterMessage');
            InviteSuccessMessage.classList.remove('hidden');
        };


    render() {
        return (
            <div className="createCharacterDiv">
                <form onSubmit={(e) => {
                    this.handleSubmitCharacterCreate(e);
                }}>
                    <label>Character Name:</label>
                    <input type="text"
                        name="create-username"
                        placeholder="Charater Name:"
                        ref="characterUsername"
                        required />

                        <button type="submit">Submit</button>
                </form> <br />
                <section className="createCharacterMessage hidden">
                    <p>Character Successfully Created</p>
                    <Link className="createCharacterMessageHomeButton" to="/home">Return to Home</Link>
                </section>
            </div>
        );
    };
};

export default NewCharacterCreation;