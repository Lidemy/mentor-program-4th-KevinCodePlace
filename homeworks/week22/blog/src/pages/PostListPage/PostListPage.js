import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPosts, getPaginatePosts } from '../../WebAPI';

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

  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PaginateContainer = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const Paginate = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 0 10px;
  border: 1px solid #fbfbfb;
  border-radius: 3px;
  list-style: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
`;


const Post = ({post}) => {
  return(
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
}

const createPaginateArr = (totalPages) => {
  const tempArr = [];
  for (let i = 1; i <= totalPages; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

Post.prototypes = {
  post: PropTypes.object
};


const PostListPage = () => {
  const [paginate, setPaginate] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      const totalPages = Math.ceil(posts.length / 5);
      setPaginate(createPaginateArr(totalPages));
      getPaginatePosts(1).then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  const handleClickPaginate = (page) => () => {
    getPaginatePosts(page).then((posts) => {
      setPosts(posts);
    });
  };

  return(
    <Root>
      {posts.length > 0 ? (
        posts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <Post post={{ title: 'Loading...' }} />
      )}
      <PaginateContainer>
        {posts.length > 0 &&
          paginate.map((page) => (
            <Paginate onClick={handleClickPaginate(page)} key={page}>
              {page}
            </Paginate>
          ))}
      </PaginateContainer>
    </Root>
  );
};

export default PostListPage;