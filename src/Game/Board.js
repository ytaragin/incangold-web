import React from "react";
import GameState from "./GameState";
import InputArea from "./InputArea"
import PlayedArea from "./PlayedArea";
import PlayerInfo from "./PlayerInfo";
import Players from "./Players"




function Board() {
    return (
        <div> 
            The board is here.
            <GameState />
            <Players/>
            <PlayerInfo/>
           <InputArea/>
            <PlayedArea/>
            Until here
        </div>

    );
}
















export default Board;