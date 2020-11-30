import styled from '@emotion/styled';
import { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';


const HeaderContainer = styled.div`
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0px 32px;
    box-sizing: border-box;
    background:white;
`;

const Sitename = styled.div`
    font-size: 32px;
    font-weight: bold;
    margin-right: 64px;
`;

const NavbarList = styled.div`
    display: flex;
    align-item: center;
    height: 64px;
`;

const Nav = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    width: 100px;
    cursor: pointer;
    color:black;
    text-decoration: none;

    background: ${props => props.background};
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Header = () => {
    const location = useLocation(); 
    const history = useHistory();
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        setAuthToken(' ');
        setUser(null);
        if(location.pathname !== '/') {
            history.push('/');
        }
    };  

    return(
        <HeaderContainer>
            <LeftContainer>
                <Sitename>我的第一個部落格</Sitename>
                <NavbarList>
                    <Nav background={location.pathname === '/' ? 'rgba(0,0,0, 0.2)' : ''}  to="/">首頁</Nav>
                    <Nav background={location.pathname === '/post-list' ? 'rgba(0,0,0, 0.2)' : ''}  to="/post-list">文章列表</Nav>
                    <Nav background={location.pathname === '/about' ? 'rgba(0,0,0, 0.2)' : ''}  to="/about">關於</Nav>
                    {user && <Nav background={location.pathname === '/new-post' ? 'rgba(0,0,0, 0.2)' : ''}  to="/new-post">發布文章</Nav>}
                </NavbarList>
            </LeftContainer>
            <NavbarList>
                {!user && <Nav background={location.pathname === '/login' ? 'rgba(0,0,0, 0.2)' : ''} to="/login">登入</Nav>}
                {!user && <Nav background={location.pathname === '/register' ? 'rgba(0,0,0, 0.2)' : ''} to="/register">註冊</Nav>}
                {user && <Nav onClick={handleLogout}>登出</Nav>}
            </NavbarList>
        </HeaderContainer>
    );
};

export default Header;