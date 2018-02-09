import {combineReducers} from 'redux';
import {Post} from './postReducers';
import {Comment} from './commentReducer';
import {sortState} from './currentSortState';
import {category} from './currentCategory'

export default combineReducers({
    Post,
    Comment,
    category,
    sortState
})