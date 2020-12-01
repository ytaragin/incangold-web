import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchGames, gameListSelector, gamesList} from '../slices/GameListSlice';
import { Link } from 'react-router-dom'
import {fetchGameDetails } from '../slices/gamestate';


export const GameListItem = ({ game }) => {
    const dispatch = useDispatch()
    return (
      <li key={game.gameID}>
          <Link to={`/game/${game.gameID}`} onClick={() => dispatch(fetchGameDetails(game.gameID))}>
             Game ID: {game.gameID} Create Time: {game.statusTime}
            </Link>
      </li>
    );
  };

export default function GameList () {

    const dispatch = useDispatch();
    const gamesState = useSelector(gameListSelector);

    const listItems = gamesState.games.map((game) =>
        <GameListItem game={game}></GameListItem>
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



/*
        <li key={game.gameID}>
            Game: {game.gameID} Create Time: {game.statusTime}
        </li>
 */