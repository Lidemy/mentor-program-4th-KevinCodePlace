import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETEAll_TODO} from '../actionTypes';

let nextID = 0;

const initialState = {
    todos:[]
};

const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO: {
            return {
              ...state,
              todos: [
                {
                  id: ++nextID,
                  content: action.payload.content,
                  isDone: false,
                },
                ...state.todos,
              ],
            };
        }

        case DELETE_TODO: {
            return {
              ...state,
              todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        }
        
        case TOGGLE_TODO : {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if(todo.id !== action.payload.id) return todo;
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    }
                })
            }
        }

        case DELETEAll_TODO : {
            nextID = 0;
            return {
                ...state,
                todos: [],
            };
        }

        default : {
            return state;
        }
    }   
}
export default todosReducer