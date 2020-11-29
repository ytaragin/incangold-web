import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
    stay: false,
}

const choiceSlice = createSlice({
    name: 'choice',
    initialState,
    reducers: {
        madeChoice: (state, {payload}) => {
            state.stay = payload
        }
    },
});




export const { madeChoice } = choiceSlice.actions;
export const choiceSelector = state => state.choice;

export default choiceSlice.reducer;








