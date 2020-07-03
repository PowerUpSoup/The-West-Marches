import React, { Component } from 'react';
import NoticeJoinButton from './NoticeJoinButton';
import ApiContext from '../../ApiContext';

class Notice extends Component {

    static contextType = ApiContext;

    getPlayerArray(playerArray) {
        
        this.context.noticePlayers.map((noticePlayer, key) => {
            if (noticePlayer.notice_id === this.props.notice.id) {
                playerArray.push(noticePlayer.name)
            } else {
                return null
            }
            return playerArray
        })
    }

    getCharacterArray(characterArray) {
        this.context.noticeCharacters.map((noticeCharacter, key) => {
            if (noticeCharacter.notice_id === this.props.notice.id) {
                characterArray.push(noticeCharacter.name)
            } else {
                return null
            }
            return characterArray
        })
    }

    render() {
        let playerArray = []
        let characterArray = []
        return (
            <div className="Notice">
                {this.props.notice.message}
                <br />
                Players:
                <ul className="Notice-Player-List">
                    {this.getPlayerArray(playerArray)}
                    {playerArray.map((player, key) => {
                        return(<li className="Notice-Player-Item" key={key}>{player}</li>)
                    })}
                </ul>
                Characters:
                <ul className="Notice-Character-List">
                    {this.getCharacterArray(characterArray)}
                    {characterArray.map((character, key) => {
                        return(<li className="Notice-Character-Item" key={key}>{character}</li>)
                    })}
                </ul>
                Status:
                {this.props.notice.status}
                <NoticeJoinButton notice={this.props.notice} />
            </div>
        )
    }
}

export default Notice;