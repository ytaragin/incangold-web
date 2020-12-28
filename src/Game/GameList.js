import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchGames, gameToJoin, gameListSelector, gamesList, joinGame} from '../slices/GameListSlice';
import { Link } from 'react-router-dom'
import {fetchGameDetails } from '../slices/gamestate';
import {gameStateSelector } from '../slices/gamestate';
import { Formik, Form, Field, useField, ErrorMessage } from 'formik';


export const GameListItem = ({ game }) => {
    const dispatch = useDispatch()
    const gamesState = useSelector(gameListSelector);

    let isPlayerInGame = gamesState.joinedGames.includes(game.gameID);

    return (
      <li key={game.gameID}>
          
             Game ID: {game.gameID} Create Time: {game.statusTime}
             <Link to={`/game/${game.gameID}`} onClick={() => dispatch(gameToJoin(game.gameID))}>
                 { isPlayerInGame ? 'Play' : 'View' } Game
            </Link>
            <button className="games" 
                 onClick={()=>dispatch(gameToJoin(game.gameID))}>
                     Join Game
            </button>

            <Link to={`/join/${game.gameID}`} >
                 Join Game
            </Link>
      </li>
    );
  };

  

function validate(values) {
    const errors = {};
    if (!values.gameId) {
        errors.gameId = 'Game ID Required';
    }
    if (!values.name) {
        errors.name = 'Name Required'
    } else if ( values.name.length < 3 ) {
        errors.name = 'Name too short';
    }
    return errors;
}
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  }

export default function GameList () {

    const dispatch = useDispatch();
    const gamesState = useSelector(gameListSelector);

    let id = gamesState.joining;

    const listItems = gamesState.games.map((game) =>
        <GameListItem game={game}></GameListItem>
    );
    console.log(fetchGames);
    console.log(gamesList);
    return (
        <div>
            <h2>Join a game</h2>
            <Formik
            initialValues={{ gameId: gamesState.joining, name: '' }}
            validate={validate}
            onSubmit={(values) => 
                {dispatch(joinGame(values.gameId, values.name))} 
            }
            >
            {({ isSubmitting }) => (
                <Form>
                    <MyTextInput
                        label="Game to join"
                        name="gameId"
                        type="text"
                        value={gamesState.joining}
                    />
                    <MyTextInput
                        label="Your name"
                        name="name"
                        type="text"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Join
                    </button>
                </Form>
            )}
            </Formik>

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