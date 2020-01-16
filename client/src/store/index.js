// CREATES STORE: importing the devtools, createStore, applyMiddleware, rootReducer, and thunk--all to create the store
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const store=createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, createLogger({collapsed: true}))
  ));

export default store;
