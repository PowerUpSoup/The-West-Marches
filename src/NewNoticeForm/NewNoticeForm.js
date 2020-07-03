import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

class NewNoticeForm extends Component {
    static contextType = ApiContext;


    createNotice() {
        debugger
        const notice = {
            "message": this.refs.NewNoticeMessage.value,
            "status": "Open"
        }
        const characterName = this.refs.NewNoticeCharacter.value
        fetch(`${config.API_BASE_URL}/notices`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ message: notice.message, status: notice.status })
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
            .then((data) => {
                this.createNoticePlayer(data)
                this.createNoticeCharacter(data, characterName)
                this.context.addNotice(data)
            }).catch(error => {
                console.error({ error })
            })
    }

    createNoticePlayer(data) {
        debugger
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))
        const player = {
            "notice_id": data.id,
            "name": sessionStorageUser.username
        }
        fetch(`${config.API_BASE_URL}/notices/players`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ notice_id: player.notice_id, name: player.name })
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

    createNoticeCharacter(data, characterName) {
        debugger
        const character = {
            "notice_id": data.id,
            "name": characterName
        }
        fetch(`${config.API_BASE_URL}/notices/characters`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ notice_id: character.notice_id, name: character.name })
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

    handleSubmitNewNoticeForm(e) {
        e.preventDefault();
        this.createNotice()
        this.props.history.push('/home')
    }

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"))

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
                            if (character.user_id === sessionStorageUser.id) {
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