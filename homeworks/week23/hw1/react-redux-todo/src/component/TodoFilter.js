import { todoFilter } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const Filters = styled.div`
    display: flex;
`;

const Filter = styled.div`
    margin: 10px;
    padding:5px;
    cursor: pointer;
`;

const FilterBackground = styled.div`
    border: 1px solid gray;

    ${({ active }) => active && `
        background: greenyellow;
    `}
`;

const TodoFilter = () => {
    let filter = useSelector(state => state.filterState);
    const dispatch = useDispatch();
    return(
        <div>
            <Filters>
                <Filter>選擇狀態：</Filter>
                <Filter><FilterBackground active={filter === 'ALL'} onClick={() => dispatch(todoFilter('ALL'))}>全選</FilterBackground></Filter>
                <Filter><FilterBackground active={filter === 'COMPLETED'} onClick={() => dispatch(todoFilter('COMPLETED'))}>已完成</FilterBackground></Filter>
                <Filter><FilterBackground active={filter === 'UNCOMPLETED'} onClick={() => dispatch(todoFilter('UNCOMPLETED'))}>未完成</FilterBackground></Filter>
            </Filters>
        </div>     
    );
}

export default TodoFilter;