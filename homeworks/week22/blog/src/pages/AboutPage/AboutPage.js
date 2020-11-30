import styled from '@emotion/styled';

const AboutPageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const AboutLeftPage = styled.div`
  border: 1px solid gray;
  width:  50%;
  height:  calc(100vh - 70px);
  background: url(https://images.unsplash.com/photo-1529673736833-9302d731fc8f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YWJvdXQlMjB1c3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=600&q=60) center/cover no-repeat;
`;

const AboutRightPage = styled.div`
  text-align: center;  
  width: 50%;
  margin-top:30px;
`

const Aboutme = styled.div`
  word-wrap: break-word;
  width:calc(100%-50px);
  padding:30px;
`;

const MePicture = styled.div`
  margin:20px auto;
  width: 50%;
  height:calc(100vh - 330px);
  background: url(https://ca.slack-edge.com/T4CNEQF6C-U4E4QE7N3-003d575a1cb1-512) center/cover no-repeat;
`;
 
const AboutPage = () => {
  return(
    <AboutPageContainer>
      <AboutLeftPage>
      </AboutLeftPage>
      <AboutRightPage>
        <div>關於我們（取自 Huli）</div>
        <Aboutme>這是一個技術部落格，重度拖延症患者，興趣是光想不做，有很多想做的事，卻一件都沒有執行。無聊的時候喜歡寫文章，發現自己好像有把事情講得比其他人清楚的能力。相信分享與交流可以讓世界更美好。Medium 文章列表請參考：<a href='https://aszx87410.github.io/blog/medium'>https://aszx87410.github.io/blog/medium</a></Aboutme>
        <MePicture></MePicture>
      </AboutRightPage>
    </AboutPageContainer>
  );
};

export default AboutPage;