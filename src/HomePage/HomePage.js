import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Map from './components/Map.js';
import Characters from './components/Characters';
// import Noticeboard from './components/NoticeBoard';
import ApiContext from '../ApiContext';

class DMHomePage extends Component {

    static contextType = ApiContext;

    logOutUser() {

    }

    render() {
            if (this.context.loggedInUser.role === "dungeon_master") {
                return (
                    <div>
                        <Map />
                        {/* <NoticeBoard /> */}
                        this is the DMHomePage
                    </div>
                )
            }
            if (this.context.loggedInUser.role === "player") {
                return (
                    <div>
                        <Map />
                        <Characters />
                        {/* <Noticeboard /> */}
                        this is the PlayerHomePage
                    </div>
                )
            } else {
                this.props.history.push('/')
            }
        }
    }


export default DMHomePage;