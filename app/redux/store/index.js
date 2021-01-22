import { combineReducers, createStore } from 'redux';
import {membersReducer} from '../reducers/membersReducer'
const rootReducer = combineReducers({
    members: membersReducer
});

const store = createStore(rootReducer);
export {store}