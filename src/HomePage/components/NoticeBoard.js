import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import Notice from './Notice';

class NoticeBoard extends Component {

    static contextType = ApiContext;

    render() {
        if (this.context.loggedInUser.role === "dungeon_master") {
            return (
                <div>
                    <div className="Notices">
                        {this.context.notices.map((notice, key) => {
                                return <Notice
                                    key={key}
                                    notice={notice} />
                        })}
                    </div>
                </div>
            )
        } else if (this.context.loggedInUser.role === "player") {
            return (
                <div>
                    <Link to="/new-notice">Create New Notice</Link>
                    <div className="Notices">
                        {this.context.notices.map((notice, key) => {
                            if (notice.status === "Open") {
                                return <Notice
                                    key={key}
                                    notice={notice} />
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default NoticeBoard;
