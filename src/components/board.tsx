import React, { useContext, useEffect, useState } from 'react';
import Cell from './cell';
import { GameContext } from '@/context/gameContext';

const Board = React.memo(() => {
  const game = useContext(GameContext);

  // Initialize board and solution from context
  const [board, setBoard] = useState<string[]>(game?.board[0]?.split('') || []);
  const solution = game?.solution[0]?.split('') || [];
  const [history, setHistory] = useState<string[][]>([board]);

  useEffect(() => {
    if (game?.board[0]) {
      const newBoard = game.board[0].split('');
      setBoard(newBoard);
      setHistory([newBoard]);
      console.log(history)
    }
  }, [game?.board[0]]);
  
  const updateCell = (index: number, value: string) => {
    if (value.match(/^[1-9]$/) || value === '-') {
      const updatedBoard = [...board];
      updatedBoard[index] = value;

      setBoard(updatedBoard);
      setHistory((prevHistory) => [...prevHistory, updatedBoard]);
    }
  };

  return (
    <div className="grid grid-cols-9 grid-rows-9 w-96 h-96 m-4 border-l-2 border-t-2 border-solid border-slate-800">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          index={index}
          setBoardVal={(val) => updateCell(index, val)}
          correct={solution[index]}
          initial={game?.board[0][index]}
        />
      ))}
    </div>
  );
});

export default Board;