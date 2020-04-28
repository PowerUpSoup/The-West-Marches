import React, { Component } from 'react';
import apiContext from '../ApiContext';

class NewCharacterCreation extends Component {

    static contextType = apiContext;

    handleSubmitCharacterCreate = (e) => {
        e.preventDefault();
        const character = {
            "id": 2, 
            "user_id": this.context.loggedInUser.id,
            "name": this.refs.characterUsername.value
        }
        this.context.addCharacter(character)
        this.props.history.push('/home')
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