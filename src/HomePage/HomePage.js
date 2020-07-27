import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Map from './components/Map.js';
import Characters from './components/Characters';
import NoticeBoard from './components/NoticeBoard';
import ApiContext from '../ApiContext';

class HomePage extends Component {

    static contextType = ApiContext;
    
    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
        
        if (sessionStorageUser.role === "dungeon_master") {
            return (
                <div>
                    <Map />
                    <NoticeBoard />
                </div>
            );
        }
        else if(sessionStorageUser.role === "player") {
            return (
                <div>
                    <Map />
                    <Characters />
                    <NoticeBoard />
                </div>
            );
        } else {
            this.props.history.push('/');
            return (null);
        };
    };
};


export default HomePage;