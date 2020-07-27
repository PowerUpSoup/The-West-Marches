import React, { Component } from 'react';
import dmMap from './DM-Campaign-Map.jpg';
import playerMap from './Campaign Map.png';
import ApiContext from '../../ApiContext';

class Map extends Component {

    static contextType = ApiContext;

    render() {
        let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
        if (sessionStorageUser.role === "dungeon_master") {
            return (
                <div>
                    <img className="Map" src={dmMap} alt="The Dungeon Master's map of Barovia" />
                </div>
            );
        }
        else if (sessionStorageUser.role === "player") {
            return (
                <div>
                    <img className="Map" src={playerMap} alt="The Player's map of Barovia" />
                </div>
            );
        } else {
            this.props.history.push('/');
            return (null);
        };
    };
};


export default Map;