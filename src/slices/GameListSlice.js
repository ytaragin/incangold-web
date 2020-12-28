import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'



const initialState = {
    games: [{"gameID":"123","statusTime":100123,"gameStatus":"CREATED"},
               {"gameID":"345","statusTime":100345,"gameStatus":"CREATED"}],
    status: `Init ${new Date().getHours()}:${new Date().getMinutes()}`,
    joining: "",
    joinedGames: [],

}



export const JoiningEnum  = {
  NOTJOINED : "Not joined",
  JOINING : 'Joining',
  JOINED : 'loaded',
  FAILED : 'failed' 
};


//https://oaak7plya5.execute-api.us-east-2.amazonaws.com/games


export const joinGame = createAsyncThunk('games/joinGame', async (gameId, name) => {
  const api = axios.create({
      baseURL: 'https://oaak7plya5.execute-api.us-east-2.amazonaws.com',
      headers: {
          'Content-Type': 'application/json'
      },
  })

  /*
  curl --header "Content-Type: application/json" \                                     *[main]
>   --request POST \
>   --data '{"player":"Joe"}' https://oaak7plya5.execute-api.us-east-2.amazonaws.com/game/396104/player
{"statusCode":200}
*/

  console.log('About to make call to join game');
  let params = {
      player: name,
  }
  const response = await api.post(`/game/${gameId}/player`, params);
  console.log(response);
  
  return {
      joined: gameId
  };
});



export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    const api = axios.create({
        baseURL: 'https://oaak7plya5.execute-api.us-east-2.amazonaws.com',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log('About to make call');
    const response = await api.get('/games');
    console.log(response);
    
    return response.data.games;
});

const gameListSlice = createSlice({
    name: 'gamelist',
    initialState,
    reducers: {
        gamesList: (state, action) => {
            state.games.push(action.payload);
        },
        gameToJoin: (state, action) => {
          state.joining = action.payload;
        },
    },
    extraReducers: {
      [fetchGames.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchGames.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.games = action.payload;
      },
      [fetchGames.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
        state.joining = "";
      },
      [joinGame.pending]: (state, action) => {
        state.status = 'Joining'
      },
      [joinGame.fulfilled]: (state, action) => {
        state.status = JoiningEnum.JOINED;  
        state.joined = action.payload;
        state.joinedGames.push(state.joining);
        state.joining = "";
      },
      [joinGame.rejected]: (state, action) => {
        state.status = JoiningEnum.FAILED;
        state.error = action.error.message;
      }      
   }
});




export const { gamesList, gameToJoin } = gameListSlice.actions;
export const gameListSelector = state => state.gamelist;

export default gameListSlice.reducer;
