import React, { Component } from 'react';
import NoticeJoinButton from './NoticeJoinButton';
import ApiContext from '../../ApiContext';

class Notice extends Component {

    static contextType = ApiContext;

    render() {
        return (
            <div className="Notice">
                {this.props.notice.message}
                <br />
                Players:
                <ul className="Notice-Player-List">
                    {this.props.notice.players.map((player, key) => {
                        return(<li className="Notice-Player-Item" key={key}>{player}</li>)
                    })}
                </ul>
                Characters:
                <ul className="Notice-Character-List">
                    {this.props.notice.characters.map((character, key) => {
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