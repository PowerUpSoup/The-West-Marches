import React, { Component } from 'react';
import ApiContext from '../../ApiContext.js';
import config from '../../config';


class NoticeJoinButton extends Component {

    static contextType = ApiContext;

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addNewCharacterToNotice() {
        
        const noticeCharacter = {
            "notice_id": this.props.notice.id,
            "name": this.refs.NewNoticeCharacter.value
        }
        fetch(`${config.API_BASE_URL}/notices/characters`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ notice_id: noticeCharacter.notice_id, name: noticeCharacter.name })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.context.addNoticeCharacter(data)
            }).catch(error => {
                console.error({ error })
            })
    }


    addNewPlayerToNotice() {
        
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))
        const noticePlayer = {
            "notice_id": this.props.notice.id,
            "name": sessionStorageUser.username
        }
        fetch(`${config.API_BASE_URL}/notices/players`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ notice_id: noticePlayer.notice_id, name: noticePlayer.name })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.context.addNoticePlayer(data)
            }).catch(error => {
                console.error({ error })
            })
    }

    handleSubmitNoticeJoinForm(e) {
        e.preventDefault();
        this.addNewCharacterToNotice()
        this.addNewPlayerToNotice()
        
    }

    handleDMPickupNoticeSubmit(e) {
        e.preventDefault();
        const join = {
            "id": this.props.notice.id,
            "message": this.props.notice.message,
            "status": "Picked Up"
        }
        fetch(`${config.API_BASE_URL}/notices/${join.id}`, {
            method: 'put',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ status: join.status })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.context.joinNotice(join)
            }).catch(error => {
                console.error({ error })
            })
    }

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))
        if (sessionStorageUser.role === "dungeon_master") {
            return (
                <div>
                    <button className="dm-pickup-notice-button" onClick={(e) => {
                        this.handleDMPickupNoticeSubmit(e)
                    }}>
                        Pick up!</button>
                </div>
            )
        } else if (sessionStorageUser.role === "player") {
            return (
                <div>
                    <form id="NoticeJoinButtonForm" className="NoticeJoinButtonForm" onSubmit={(e) => {
                        this.handleSubmitNoticeJoinForm(e)
                    }}>
                        <label name="choose-character">Choose Your Character:</label>
                        <select id="character-select"
                            ref="NewNoticeCharacter"
                            required>
                            {this.context.characters.map((character, key) => {
                                if (character.user_id === sessionStorageUser.id) {
                                    return (
                                        <option
                                            value={character.name}
                                            key={key}>{this.capitalizeFirstLetter(character.name)}</option>
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