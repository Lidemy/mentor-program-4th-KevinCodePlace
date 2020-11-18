import {GameBoardBg, Block, Black, White} from './GameCSS';

const GameBoard = ({handleClick, squares}) => {
    return (
        <GameBoardBg>
            {squares.map((item, index)=>
                <Block key={index} onClick={() => handleClick(index)}>
                    {(item === null) ? ' ' : (item === 'B') ? <Black></Black>:<White></White>}
                </Block>
            )}
        </GameBoardBg>
    );
};

export default GameBoard;

