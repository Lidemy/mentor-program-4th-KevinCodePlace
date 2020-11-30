import React,{ useState , useEffect } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route, useParams,} from "react-router-dom";
import Header from '../Header';
import { getPosts, getMe } from '../../WebAPI';
import HomePage from '../../pages/HomePage';
import PostListPage from '../../pages/PostListPage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import SinglePost from '../../pages/SinglePost'
import { AuthContext } from '../../contexts';


const PageContainer = styled.div`
  padding-top: 56px;
  box-sizing:border-box;
`;



const BlogPost = (posts) =>{
  let { slug } = useParams();
  return <SinglePost postID={slug} posts={posts}/>;
}


function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMe().then((response => {
      if(response.ok) {
        setUser(response.data);
      }
    }));
  },[]);

  useEffect(() => {
    getPosts().then(posts => setPosts(posts));
  },[]);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <PageContainer>
        <Router>
        <Header />
        <Switch>
          <Route exact path="/" >
            <HomePage posts={posts}/>
          </Route>
          <Route exact path="/post-list" >
            <PostListPage />
          </Route>
          <Route exact path="/about" >
            <AboutPage />
          </Route>
          <Route exact path="/new-post" >
            <NewPostPage />
          </Route>
          <Route path="/posts/:slug">
            <BlogPost posts={posts}/>
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
        </Router>
      </PageContainer>
    </AuthContext.Provider>
  );
}

export default App;
