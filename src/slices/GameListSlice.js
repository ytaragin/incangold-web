import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const initialState = {
    games: [{"gameID":"123","statusTime":100123,"gameStatus":"CREATED"},
               {"gameID":"345","statusTime":100345,"gameStatus":"CREATED"}],
    status: `Init ${new Date().getHours()}:${new Date().getMinutes()}`,
}

//https://oaak7plya5.execute-api.us-east-2.amazonaws.com/games


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
})

const gameListSlice = createSlice({
    name: 'gamelist',
    initialState,
    reducers: {
        gamesList: (state, action) => {
            state.games.push(action.payload);
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
          state.error = action.error.message
        }
      }
});




/*
export const fetchGames = () => async dispatch => {
  try {
      await api.get('/games')
           .then((response) => dispatch(usersSuccess(response.data)))
    }
    catch (e) {
       return console.error(e.message);
    }
}
*/

export const { gamesList } = gameListSlice.actions;
export const gameListSelector = state => state.gamelist;

export default gameListSlice.reducer;
