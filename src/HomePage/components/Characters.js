import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class Characters extends Component {
    static contextType = ApiContext;

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))

        return (
            <div>
                <Link to="/new-character">Create New Character</Link>
                <ul>Your Characters:
                {this.context.characters.map((character, key) => {
                    if (character.user_id === sessionStorageUser.id) {
                        return (
                            <li key={key}>
                                {character.name}
                            </li>
                        )
                    } else {
                        return null
                    }
                })}
                </ul>
            </div>
        )
    }
}

export default Characters;