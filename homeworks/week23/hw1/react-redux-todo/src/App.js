import styled from 'styled-components';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';

const Container = styled.div`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 500px;
  margin: 10px auto;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  padding: 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 20px;
`;

const app = () => {
  return (
    <div>
      <Container>
        <Title>Redux Hooks Todo List</Title>
        <TodoInput/>
        <TodoList/>
        <TodoFilter/>
      </Container>
    </div>
  )
}

export default app;