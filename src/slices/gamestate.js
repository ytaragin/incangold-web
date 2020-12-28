import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoadingEnum } from './CommonDefs'

export const initialState = {
    game: {},
    playedCards: [],
    status: LoadingEnum.NOTLOADED,
}

export const fetchGameDetails = createAsyncThunk('game/fetchGame', async (gameid) => {
    const api = axios.create({
        baseURL: 'https://oaak7plya5.execute-api.us-east-2.amazonaws.com',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log('About to make call');
    const response = await api.get(`/game/${gameid}`);
    console.log(response);
    
    return response.data.game;
})


const gameStateSlice = createSlice({
    name: 'gamestate',
    initialState,
    reducers: {
        cardFlipped: (state, {payload}) => {
            state.playedCards.push(payload)
        },
        decisionMade: (state, {payload}) => {

        },


    },
    extraReducers: {
        [fetchGameDetails.pending]: (state, action) => {
          state.status = LoadingEnum.LOADING
        },
        [fetchGameDetails.fulfilled]: (state, action) => {
          state.status = LoadingEnum.LOADED
          state.game = action.payload;
        },
        [fetchGameDetails.rejected]: (state, action) => {
          state.status = LoadingEnum.FAILED;
          state.error = action.error.message;
        }
      }
});




export const { madeChoice } = gameStateSlice.actions;
export const gameStateSelector = state => state.gamestate;

export default gameStateSlice.reducer;
