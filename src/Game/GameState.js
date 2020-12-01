import React from "react";
import {useSelector} from 'react-redux';
import {gameStateSelector } from '../slices/gamestate';


export default function GameState() {
    const gameState = useSelector(gameStateSelector).game.state;

    return (
        <div>
        <h2>Game State</h2>
        <table>
        <tr><td>Round</td><td>{gameState.currentRound}</td></tr>
        <tr><td>Treasure Waiting</td><td>{gameState.treasureWaiting}</td></tr>
        </table>

        </div>
    );

}