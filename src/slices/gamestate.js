import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const initialState = {
    game: {},
    playedCards: [],
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
    
    return response.data.games;
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
          state.status = 'loading'
        },
        [fetchGameDetails.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.game = action.payload;
        },
        [fetchGameDetails.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      }
});




export const { madeChoice } = gameStateSlice.actions;
export const gameStateSelector = state => state.gamestate;

export default gameStateSlice.reducer;
