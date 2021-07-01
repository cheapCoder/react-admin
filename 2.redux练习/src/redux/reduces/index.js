import person from './Person';
import reducer from './reducer';
import {combineReducers} from "redux"
export default combineReducers({
  person, count: reducer
})