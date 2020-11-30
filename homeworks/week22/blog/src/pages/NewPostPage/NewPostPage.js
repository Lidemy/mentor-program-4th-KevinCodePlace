import { useState } from 'react';
import { newPost } from '../../WebAPI';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';


const NewPostContainer = styled.div`
  position: absolute;
  left: 40%;
  transform: translateX(-80%);
  height:calc(100vh - 64px);
  width:100px;
  padding:30px;
  z-index:-1;
  `;

const NewPostTitle = styled.input`
  margin-top:10px;
  margin-bottom:20px;
  width:500px;
`;

const NewPostContent = styled.input`
  margin-top:10px;  
  margin-bottom:20px;
  word-wrap: break-word;
  width:500px;
  height:300px;

  `;

const ErrorMessage = styled.div`
  color: red;
`;


const NewPostPage = () => {
  
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    newPost(newPostTitle, newPostContent).then((response) => {
      if(response.ok === 0) {
        return setErrorMessage(response.message);
      }
      
      alert('新增文章成功');
      history.push('/');
      window.location.reload();
    });
  }

  return(
    <NewPostContainer>
      <form onSubmit={handleSubmit}>
        <div>
          標題：
          <NewPostTitle type='text' placeholder='請輸入文章標題' value={newPostTitle} onChange={event => setNewPostTitle(event.target.value)}/>
        </div>
        <div>
          內文：
          <NewPostContent type='textarea' placeholder='請輸入內文' value={newPostContent} onChange={event => setNewPostContent(event.target.value)}/>
        </div>
        <div>
          <button>送出文章</button>
        </div>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </NewPostContainer>
  );
};

export default NewPostPage;