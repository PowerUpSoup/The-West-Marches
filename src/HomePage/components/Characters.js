import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class Characters extends Component {
    static contextType = ApiContext;

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
                                {this.capitalizeFirstLetter(character.name)}
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