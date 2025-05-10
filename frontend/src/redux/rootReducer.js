import { combineReducers } from 'redux';
import userReducer from '../Reduces/userRducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
