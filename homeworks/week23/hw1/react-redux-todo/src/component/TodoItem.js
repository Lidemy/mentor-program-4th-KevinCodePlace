import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleTodo, deleteTodo } from '../redux/actions';

const TodoList = styled.div`
  display: flex;
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid rgba(192,192, 192, 0.6) ;
  border-radius: 5px;
`;

const TodoCheck = styled.div`
    margin-right: 10px;
    cursor: pointer;
    font-size: 20px;
`;

const EachTodoItem = styled.div`
    flex:1;
    cursor: pointer;
`;

const TodoDelete = styled.div`
    cursor: pointer;
    padding: 5px;
    color: black;
    background-color: transparent;

    &:hover {
        color: white;
        background-color: red;
    }
`;

const TodoItem = ({todo, id, isDone}) => {
    const dispatch = useDispatch();
    return(
        <div>
            <TodoList>
                <TodoCheck onClick={() => dispatch(toggleTodo(id))}>{isDone ? '☑' : '☐'}</TodoCheck>
                <EachTodoItem
                    onClick={() => dispatch(toggleTodo(id))}>{todo}
                </EachTodoItem>
                <TodoDelete onClick={() => dispatch(deleteTodo(id))}>X</TodoDelete>
            </TodoList>
        </div>
    )
}

export default TodoItem;