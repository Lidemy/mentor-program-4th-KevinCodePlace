import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, deleteAllTodo } from '../redux/actions';

const NewTodoInput = styled.input`
    width: 400px;
    height: 30px;
    margin-top:30px
`;

const ClearAllButton = styled.button`
    height: 35px;
    margin-left: 20px;
`;


const TodoInput = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if(event.which === 13) {
            dispatch(addTodo(inputValue));
            setInputValue('');
        }
    }

    return(
        <div>
           <NewTodoInput type='text' placeholder='請輸入待辦事項...（Enter）' 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}></NewTodoInput> 
           <ClearAllButton onClick={() => dispatch(deleteAllTodo())}>一鍵清空</ClearAllButton>
        </div>
    )

}

export default TodoInput;