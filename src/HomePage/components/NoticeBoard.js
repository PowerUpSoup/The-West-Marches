import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import Notice from './Notice';

class NoticeBoard extends Component {

    static contextType = ApiContext;

    componentDidMount() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ loggedInUser: sessionStorageUser});
    }

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
        if (sessionStorageUser.role === "dungeon_master") {
            return (
                    <div className="Notices">
                        {this.context.notices.map((notice, key) => {
                            if (notice.status === "Closed") {
                                    return (null);
                                } else if (notice.status === "Open" || "Picked Up") {
                                return <Notice
                                    key={key}
                                    notice={notice} />
                                } else {
                                    return (null);
                                };
                        })}
                    </div>
            );
        } else if (sessionStorageUser.role === "player") {
            return (
                <div className="Notices">
                    <Link className="CreateNewNoticeButton" to="/new-notice">Create New Notice</Link>
                        {this.context.notices.map((notice, key) => {
                            if (notice.status === "Open") {
                                return <Notice
                                    key={key}
                                    notice={notice} />
                            } else {
                                return null;
                            };
                        })}
                </div>
            );
        } else {
            return (null);
        };
    };
};

export default NoticeBoard;
