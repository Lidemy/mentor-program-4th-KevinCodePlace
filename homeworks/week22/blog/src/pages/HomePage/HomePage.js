import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { deletePost } from '../../WebAPI';


const Root = styled.div`
  top:64px;
  left:150px;
  width: 80%;
  margin: 0 auto;
  height:80vh;
   
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
  flex:1;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PostDelete = styled.div`
  margin-left: 5px;
  border:1px solid gray;
  border-radius:3px;
  &:hover {
    background:red;
    color:white;
    cursor:pointer;
  }

`;

const handleDelelte = (postID) => {
  
  deletePost(postID).then((data) => {
  if(data.ok === 0) { return alert('刪除失敗')};
    alert('刪除成功！');
    window.location.reload();
  });
}

const Post = ({post, user}) => {
  const postID = post.id;
  return(
    <PostContainer>
      <PostTitle to={`/posts/${postID}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostDelete onClick={() => handleDelelte(postID)}>{user ? '刪除' : ' '}</PostDelete>
    </PostContainer>
  )
}

Post.prototypes = {
  post: PropTypes.object
};


const HomePage = ({ posts }) => {
  const { user, setUser } = useContext(AuthContext); 

  return(
    <Root>
      {posts.map((post) => <Post key={post.id} post={post} user={user}/>)}
    </Root>
  );
};

export default HomePage;