import React from 'react'
import { useSelector} from 'react-redux';
import {gameStateSelector } from '../slices/gamestate';


function Players() {

    const gameState = useSelector(gameStateSelector);
    const players = gameState.game.state.players.map((player) =>
        <li key={player.name}>
            {player.name}
        </li>
    );
    return (
        <div>
            <h2>Players</h2>
            <ul>
                {players}
            </ul>
        </div>
    );
}

export default Players;