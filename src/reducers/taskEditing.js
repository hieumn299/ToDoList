import * as types from '../constants/ActionTypes';

var initialState = null;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_ITEM:
            console.log(action);
            state = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            console.log(state);
            return state;
        default:
            return state;
    }
}
export default myReducer;