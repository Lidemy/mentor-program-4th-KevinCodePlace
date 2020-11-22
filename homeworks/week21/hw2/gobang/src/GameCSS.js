import styled from '@emotion/styled';

export const GameWrapper = styled.div`
    width: 500px;
    height: 500px;
    margin: 0 auto;
`;

export const GameStatus = styled.div`
    width: 100%;
    margin-left: 100px;
    margin-bottom: 20px;
`;

export const AgainButton = styled.button`
    margin-left: 10px;
`;

export const GameBoardBg = styled.div`
    height: 380px;
    width: 380px;
    display: flex;
    flex-wrap: wrap;
    top: 10px;
    left: 10px;
    z-index: -100;
`; 

export const Block = styled.div`
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    border:1px solid black;
`;

export const Black = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: black;
`;

export const White = styled.div`
    height: 15px;
    width: 15px;
    box-sizing: border-box;
    border:0.5px solid black;
    border-radius: 50%;
    background: white;
`;


