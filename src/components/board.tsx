import React, { useContext, useEffect, useState, useCallback } from 'react';
import Cell from './cell';
import { GameContext } from '@/context/gameContext';
import { GameContextType } from '@/types/types';

const Board = React.memo(() => {
  const game = useContext<GameContextType | undefined>(GameContext);

  if (!game) {
    throw new Error('GameContext is undefined');
  }

  // Initialize board only once when puzzle changes
  const [board, setBoard] = useState<string[]>(() => 
    game.board[0]?.split('') || []
  );
  const solution = game.solution[0]?.split('') || [];

  // Only update board when puzzle changes, not on verify
  useEffect(() => {
    if (game.board[0] && !game.verify) {
      const newBoard = game.board[0].split('');
      setBoard(newBoard);
    }
  }, [game.board[0]]); // Remove game.board dependency

  const updateCell = useCallback((index: number, value: string) => {
    if (!game.verify && (value.match(/^[1-9]$/) || value === '-')) {
      const updatedBoard = [...board];
      updatedBoard[index] = value;
      setBoard(updatedBoard);
      
      if (updatedBoard.join('') === solution.join('')) {
        game.setGameWon(true);
      }
    }
  }, [board, solution, game]);

  return (
    <div className="grid grid-cols-9 grid-rows-9 w-96 h-96 m-4 border-l-2 border-t-2 border-solid border-slate-800">
      {board.map((value, index) => (
        <Cell
          key={index} // Remove value from key to prevent re-rendering
          value={value}
          index={index}
          setBoardVal={(val) => updateCell(index, val)}
          correct={solution[index]}
          initial={game.board[0][index]}
        />
      ))}
    </div>
  );
});

Board.displayName = 'Board';

export default Board;