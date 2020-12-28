import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingEnum } from './CommonDefs'
import axios from 'axios'



export const JoiningEnum  = {
    NOTJOINED : "Not joined",
    JOINING : 'Joining',
    JOINED : 'loaded',
    FAILED : 'failed' 
 };

const initialState = {
    games: []
}

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
})

const joinGameSlice = createSlice({
    name: 'joingame',
    initialState,
    reducers: {
    },
    extraReducers: {
        [joinGame.pending]: (state, action) => {
          state.status = 'Joining'
        },
        [joinGame.fulfilled]: (state, action) => {
          state.status = JoiningEnum.JOINED;  
          state.joined = action.payload;
        },
        [joinGame.rejected]: (state, action) => {
          state.status = JoiningEnum.FAILED;
          state.error = action.error.message;
        }
      }
});

//export const { joinGame } = gameListSlice.actions;
export const joinGameSelector = state => state.joingame;

export default joinGameSlice.reducer;
