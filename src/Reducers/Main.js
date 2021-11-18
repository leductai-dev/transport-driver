import {combineReducers} from 'redux'
import transactions from './Transactions';
import user from './User';


const appReducers = combineReducers({
   transactions,user
})
export default appReducers;
