import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';

import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';


const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 120px;
  padding: 20px;
  margin: 100px auto;
  border: 1px solid #fbfbfb;
  box-shadow: 1px 1px 3px #fbfbfb;
`;

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if(data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then(response => {
        if(response.ok !==1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/'); 
      });
    });
  };

  return(
    <Form onSubmit={handleSubmit}>
      <div>
        username:{' '}
        <input 
          value={username} 
          onChange={event => setUsername(event.target.value)} 
        />
      </div>
      <div>
        password:{' '}
        <input 
          type='password' 
          value={password} 
          onChange={event => setPassword(event.target.value)} 
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
};

export default LoginPage;
