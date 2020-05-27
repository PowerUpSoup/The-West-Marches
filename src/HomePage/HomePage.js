import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Map from './components/Map.js';
import Characters from './components/Characters';
import NoticeBoard from './components/NoticeBoard';
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
                        <NoticeBoard />
                    </div>
                )
            }
            if (this.context.loggedInUser.role === "player") {
                return (
                    <div>
                        <Map />
                        <Characters />
                        <NoticeBoard />
                    </div>
                )
            } else {
                this.props.history.push('/')
            }
        }
    }


export default DMHomePage;