import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchGames, gameListSelector, gamesList} from '../slices/GameListSlice';
import GameOverview from './GameOverview';


export function GameList () {

    const dispatch = useDispatch();
    const gamesState = useSelector(gameListSelector);

    const listItems = gamesState.games.map((game) =>
        <GameOverview game={game}></GameOverview>
    );
    console.log(fetchGames);
    console.log(gamesList);
    return (
        <div>
            List of Games
            <ul>{listItems}</ul>
            <button className="games" 
                 onClick={()=>dispatch(gamesList({"gameID":"123",
                                                  "statusTime":100123,
                                                  "gameStatus":"CREATED"}))}>
                     Get Games
            </button>
            <button className="games" 
                 onClick={()=>dispatch(fetchGames())}>
                     Load From Server
            </button>
            
            <div>Status: {gamesState.status}</div>
            <div>Error: {gamesState.error}</div>
        </div>
    )

}

export default GameList


/*
        <li key={game.gameID}>
            Game: {game.gameID} Create Time: {game.statusTime}
        </li>
 */