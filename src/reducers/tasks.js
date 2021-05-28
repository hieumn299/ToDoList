import * as types from '../constants/ActionTypes';

// tự tạo id
var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
var generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    })
    return result;
}
var data = JSON.parse(localStorage.getItem('task'));
var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            var task={
                id:action.task.id,
                name:action.task.name,
                status:action.task.status
            }
            if(!task.id){
                //trường hợp add
                    task.id= generateID();
                    state.push(task);
                }
            else{
                //trường hợp edit
                var indexx=findIndex(state,task.id);
                state[indexx]=task;
            } 
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            console.log(action);
            var id = action.id;
            var index = findIndex(state, id);
            state[index].status = !state[index].status;
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
            console.log(action);
            // var id = action.id;
            // var index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}
export default myReducer;