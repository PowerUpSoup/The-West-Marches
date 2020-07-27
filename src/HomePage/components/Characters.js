import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class Characters extends Component {
    static contextType = ApiContext;

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

        return (
            <div className="CharactersHomePageDiv">
                <Link className="CreateNewCharacterButton" to="/new-character">Create New Character</Link>
                <p className="homepageCharacterListHeader">Your Characters:</p>
                <ul className="homepageCharacterList">
                {this.context.characters.map((character, key) => {
                    if (character.user_id === sessionStorageUser.id) {
                        return (
                            <li key={key}>
                                {character.name}
                            </li>
                        )
                    } else {
                        return null;
                    };
                })}
                </ul>
            </div>
        );
    };
};

export default Characters;