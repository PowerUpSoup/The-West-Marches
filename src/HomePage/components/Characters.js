import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class Characters extends Component {
    static contextType = ApiContext;

    render() {
        return (
            <div>
                <Link to="/new-character">Create New Character</Link>
                <ul>Your Characters:
                {this.context.characters.map((character, key) => {
                    if (character.user_id === this.context.loggedInUser.id) {
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