import React, { Component } from 'react';
import ApiContext from '../ApiContext';

class NewNoticeForm extends Component {
    static contextType = ApiContext;

    handleSubmitNewNoticeForm(e) {
        e.preventDefault();
        const notice = {
            "id": 100000,
            "players": [this.context.loggedInUser.username],
            "characters": [this.refs.NewNoticeCharacter.value],
            "message": this.refs.NewNoticeMessage.value,
            "status": "Open"
        }
        this.context.addNotice(notice)
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <form id="newNoticeForm" onSubmit={(e) => {
                    this.handleSubmitNewNoticeForm(e)
                }}>
                    <label name="choose-character">Choose Your Character:</label>
                    <select id="character-select"
                        ref="NewNoticeCharacter"
                        required>
                        {this.context.characters.map((character, key) => {
                            if (character.user_id === this.context.loggedInUser.id) {
                                return (
                                    <option
                                        value={character.name}
                                        key={key}>{character.name}</option>
                                )
                            } else {
                                return(null)
                            }
                        })}
                    </select>
                    <label name="message">Write a message:</label>
                    <textarea
                        className="newNoticeMessageText"
                        ref="NewNoticeMessage"
                        placeholder="What will you do on this adventure?"
                        required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewNoticeForm;