import styled from '@emotion/styled';

const Article = styled.div`
  margin: 30px 300px;
  padding: 20px;
  color: rgba(0,0,0,0.8);
  position: relative;
  min-height: 400px;
  border: solid 1px red;
  text-align: left;
  overflow:scroll;
`;

const Title = styled.h1`
  color: rgba(41, 41, 41, 1);
  margin-bottom: 30px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  word-break: break-word;
`;

const TitleContent = styled.div`
  display: flex;
`;

const Author = styled.div`
  margin-right:30px;
`;

const CreateTime = styled.div`

`;



const SinglePost = ({postID, posts}) => {
  
  let currentPost = [];
  posts.posts.map((post) => {
    if(post.id === parseInt(postID)) {currentPost.push(post);}
  });

  let currentTimeStamp = currentPost[0].createdAt
  let currentTime = timeStampToString(currentTimeStamp);
  console.log(currentTime);
  return(
    <Article>
      <Title>{currentPost[0].title}</Title>
      <TitleContent>
        <Author>User 編號：{currentPost[0].userId}</Author>
        <CreateTime>創建時間：{currentTime}</CreateTime>
      </TitleContent>
      <div>{currentPost[0].body}</div>
    </Article>
  );
};

function  timeStampToString (time){
  let datetime = new Date();
   datetime.setTime(time);
   let year = datetime.getFullYear();
   let month = datetime.getMonth() + 1;
   let date = datetime.getDate();
   let hour = datetime.getHours();
   let minute = datetime.getMinutes();
   let second = datetime.getSeconds();
   let mseconds = datetime.getMilliseconds();
   return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second+"."+mseconds;
};

export default SinglePost;
