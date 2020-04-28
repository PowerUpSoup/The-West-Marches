import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoticeBoard extends Component {
    render() {
        if (this.context.loggedInUser.role === "dungeon_master") {
            return (
                null
            )
        } if (this.context.loggedInUser.role === "player") {
            return (
                <Link to="/new-notice">Create New Notice</Link>

            )
        }
    }
}

export default NoticeBoard;
