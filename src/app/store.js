
//import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'

import createRootReducer from './reducer';

export const history = createBrowserHistory();

//  preloadedState,


export default configureStore({
  reducer: createRootReducer(history),
  middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});

