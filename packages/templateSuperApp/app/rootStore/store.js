// import listen from 'redux-action-listeners';
// import { rootReducer } from './rootReducer';
// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// // import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from 'redux-thunk'

import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

// // import ActionEmitter from './EventEmit/listenerEventRedux';

// // export const ActionStoreEmitter = new ActionEmitter();


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reducer = combineReducers({
//     rootReducer
// })

// const middlewares = [thunk]
// export const store = createStore(
//     rootReducer,
//     composeEnhancers(
//         applyMiddleware(thunk, listen(ActionStoreEmitter), ...middlewares),
//     ),
// );

export const store = createStore(
    rootReducer
    // composeWithDevTools(applyMiddleware(thunk))
);