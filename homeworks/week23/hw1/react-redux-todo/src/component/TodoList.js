import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';


const TodoList = () => {
    const todos = useSelector(state => state.todoState.todos);
    const filter = useSelector( state => state.filterState);

    const afterFilterTodos = todos.filter((todo) => {
      switch (filter) {
        case 'ALL':
          return todo;
  
        case 'COMPLETED':
          return todo.isDone === true;
  
        case 'UNCOMPLETED':
          return todo.isDone === false;
  
        default:
          return todo;
      }
    });

    return(
        <div>
            {afterFilterTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo.content}
            id={todo.id}
            isDone={todo.isDone}
          />
        ))}
        </div>
    )
}

export default TodoList;