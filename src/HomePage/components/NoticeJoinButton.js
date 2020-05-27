import React, { Component } from 'react';
import ApiContext from '../../ApiContext.js';

class NoticeJoinButton extends Component {

    static contextType = ApiContext;

    addNewCharacterToNotice() {
        this.props.notice.characters.push(this.refs.NewNoticeCharacter.value)
    }

    addNewPlayerToNotice() {
        this.props.notice.players.push(this.context.loggedInUser.username)
    }

    handleSubmitNoticeJoinForm(e) {
        e.preventDefault();
        this.addNewCharacterToNotice()
        this.addNewPlayerToNotice()
        const join = {
            "id": this.props.notice.id,
            "players": this.props.notice.players,
            "characters": this.props.notice.characters,
            "message": this.props.notice.message,
            "status": "Open"
        }
        this.context.joinNotice(join)
    }

    handleDMPickupNoticeSubmit(e) {
        e.preventDefault();
        const join = {
            "id": this.props.notice.id,
            "players": this.props.notice.players,
            "characters": this.props.notice.characters,
            "message": this.props.notice.message,
            "status": "Picked-Up"
        }
        this.context.joinNotice(join)
        debugger
    }

    render() {
        if (this.context.loggedInUser.role === "dungeon_master") {
            return (
                <div> 
                    <button className="dm-pickup-notice-button" onClick={(e) => {
                        this.handleDMPickupNoticeSubmit(e)
                    }}>
                        Pick up!</button>
                </div>
            )
        } else if (this.context.loggedInUser.role === "player") {
            return (
                <div>
                    <form id="NoticeJoinButtonForm" onSubmit={(e) => {
                        this.handleSubmitNoticeJoinForm(e)
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
                                    return (null)
                                }
                            })}
                        </select>
                        <button className="NoticeJoinButton" type="submit">Join this Adventure!</button>
                    </form>
                </div>
            )
        }
    }
}

export default NoticeJoinButton;