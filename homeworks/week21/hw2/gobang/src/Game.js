import { useState } from 'react';
import GameChangeTurn from './GameChangeTurn';
import GameBoard from './GameBoard';
import {GameWrapper} from './GameCSS';

 
const Game = () => {
    const [boardStatus, setBoardStatus] = useState({
        squares:Array(19 * 19).fill(null),
        isNextBlack:false,
    });
    const { squares, isNextBlack } = boardStatus;

    const handleClick = (index) => {
        let squares = boardStatus.squares.slice();
        if(squares[index] || isWinner(squares)) return;
        squares[index] = isNextBlack ? 'W' : 'B';
        setBoardStatus({
            squares:squares,
            isNextBlack:!isNextBlack,
        })
    }

    const handlePlayAgain = () => {
        setBoardStatus({
            squares:Array(19 * 19).fill(null),
            isNextBlack:false,
        })
    }
    const isWinner = (squares) => {
        // 先定義 5*5 棋盤的 12 種連線
        const lines = [
            [0, 1, 2 , 3, 4],
            [19, 20, 21, 22, 23],
            [38, 39, 40, 41, 42],
            [57, 58, 59, 60, 61],
            [76, 77, 78, 79, 80],
            [0, 19, 38, 57, 76],
            [1, 20, 39, 58, 77],
            [2, 21, 40, 59, 78],
            [3, 22, 41, 60, 79],
            [4, 23, 42, 61, 80],
            [0, 20, 40, 60, 80],
            [4, 22, 40, 58, 76],
        ];
        
        for(let i = 0; i <= 14; i++) {  // 5*5 棋盤連線直向掃描
    
            for(let j = 0; j <= 14; j++) {  // 5*5 棋盤連線橫向掃描
                const newlines = lines.map((line) => {
                    const newline = line.map((num) => num + (i*19) +j)
                    return newline;
                });
                    
                for(let k = 0; k < newlines.length; k++) { // 掃描 12 種連線
                    const [a, b, c, d, e] = newlines[k]
                    if(
                        squares[a]
                        && squares[a] === squares[b] 
                        && squares[a] === squares[c] 
                        && squares[a] === squares[d] 
                        && squares[a] === squares[e]
                    ) {
                        return squares[a];
                    }
                }
            }
        }
        return null;
    }

    const status = isWinner(squares); 
    const statusCode = (status === 'B' ? '黑子' : '白子' );
    return(
        <GameWrapper>
            <GameChangeTurn status={status} isNextBlack={isNextBlack} statusCode={statusCode} handlePlayAgain={handlePlayAgain}/>
            <GameBoard handleClick={handleClick} squares={squares}/>
        </GameWrapper>
    );
}

export default Game;