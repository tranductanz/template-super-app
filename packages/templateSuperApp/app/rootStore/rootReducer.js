import { combineReducers } from 'redux';
import { exampleReducer } from '../container/reducer';

export const rootReducer = combineReducers(
    {
        exampleReducer,
    }
);
