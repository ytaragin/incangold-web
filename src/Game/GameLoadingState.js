import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {gameStateSelector, LoadingEnum } from '../slices/gamestate';
import Board from './Board';

function ErrorLoading() {
    return (
        <div>
            Unable to load game
        </div>
    )
}

function LoadingGame() {
    return (
    <div>
      Loading game details
    </div>
    );
}

function GameDetails() {
    const gameState = useSelector(gameStateSelector);
    console.log(gameState);
    const players = gameState.game.state.players.map((player) =>
        <li key={player.name}>
            {player.name}
        </li>
    );
    return (
        <div>
            <ul>
                {players}
            </ul>
        </div>
    );
}

function GetGameComponent(props) {
    if (!props.gameState) {
        return (<div> No Game Defined Yet </div>);
    }
    switch (props.gameState.status ) {
        case LoadingEnum.FAILED:
            return (<ErrorLoading />);
        case LoadingEnum.LOADING:
            return ( <LoadingGame /> );
        case LoadingEnum.LOADED:
            return ( <Board/> );
        case LoadingEnum.NOTLOADED:
            return (<div> Not Loaded </div>);
            
    }
}


function GameLoadingState({match}) {

    const dispatch = useDispatch();
    const gameState = useSelector(gameStateSelector);
    console.log(gameState);
/*
    useEffect(() => {
        if (gameState.status === LoadingEnum.NOTLOADED) {
          dispatch(fetchGameDetails(match.params.gameId));
        }
      });
    
*/

//    console.log(p);
    return (
        <div className="GameState">
            <b>Game State Here</b>
            <GetGameComponent gameState={gameState} />
        </div>
    );
}


export default GameLoadingState;
