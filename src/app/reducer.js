import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import choiceReducer from '../slices/choice'
import gameListReducer from '../slices/GameListSlice'
import counterReducer from '../features/counter/counterSlice'

const rootReducer = (history) => combineReducers({
    choice: choiceReducer,
    counter: counterReducer,
    gamelist: gameListReducer,
    router: connectRouter(history),
});





export default rootReducer

