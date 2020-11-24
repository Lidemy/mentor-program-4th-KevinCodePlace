import { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { register, getMe } from '../../WebAPI';
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

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    setErrorMessage('');
    event.preventDefault();
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken('');
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/');
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        nickname:
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
      </div>
      <div>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        password:
        <input
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit">註冊</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
