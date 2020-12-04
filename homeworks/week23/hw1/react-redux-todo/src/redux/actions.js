import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETEAll_TODO, FILTER_TODO} from './actionTypes';

export const addTodo = content => {
    return {
        type:ADD_TODO,
        payload: {
            content
        },
    };
}

export const toggleTodo = id => {
    return {
        type:TOGGLE_TODO,
        payload: {
            id
        },
    };
}

export const deleteTodo = id => {
    return {
        type:DELETE_TODO,
        payload: {
            id
        },
    };
}

export const deleteAllTodo = () => {
    return {
        type:DELETEAll_TODO,
    };
}

export const todoFilter = (filter) => {
    return {
        type:FILTER_TODO,
        payload : {
            filter
        },
    };
}
