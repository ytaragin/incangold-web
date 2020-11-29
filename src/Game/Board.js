import React from "react";
import GameList from "./GameList";
import GameState from "./GameState";
import InputArea from "./InputArea"
import PlayedArea from "./PlayedArea";
import PlayerInfo from "./PlayerInfo";

class Board extends React.Component {
    render() {
        return (
            <div> 
                The board is here.
                <GameState/>
                <PlayerInfo/>
               <InputArea/>
                <PlayedArea/>
                Until here
                <GameList/>
            </div>

        )

    }
}

export default Board;