import {GameStatus, AgainButton} from './GameCSS';

const GameChangeTurn = ({status, isNextBlack, statusCode, handlePlayAgain}) => {
    return (
        <GameStatus>
            {(status === null) ? `下一個出棋為：${isNextBlack ? '白子' : '黑子' }`: `贏家為: ${statusCode}`}
            <AgainButton onClick={handlePlayAgain}>{(status === null) ? '重新來過': `再玩一局`}</AgainButton>
        </GameStatus>
    );
};

export default GameChangeTurn;

