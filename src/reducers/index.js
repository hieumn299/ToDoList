import { combineReducers } from "redux";
import Tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filterTable from './filterTable';
import keyWord from './search';
import sort from './sort';


const myReducer = combineReducers({
    tasks: Tasks,
    isDisplayForm: isDisplayForm,
    taskEditing: taskEditing,
    filterTable: filterTable,
    keyWord: keyWord,
    sort: sort
});
export default myReducer;