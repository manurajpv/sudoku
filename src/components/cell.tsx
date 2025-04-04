import { GameContext } from '@/context/gameContext';
import { GameContextType } from '@/types/types';
import React, { useContext, useMemo } from 'react';

interface CellProps {
  value: string;
  index: number;
  setBoardVal: (val: string) => void;
  correct: string;
  initial: string;
}

const Cell = React.memo(({ value, index, setBoardVal, correct, initial }: CellProps) => {
  const game = useContext<GameContextType | undefined>(GameContext);

  if (!game) {
    throw new Error('GameContext is undefined');
  }

  // Calculate background color without affecting the value
  const cellBackground = useMemo(() => {
    if (initial !== '-') return 'bg-gray-400';
    if (value !== correct && value !== '-') return 'bg-red-400';
    return '';
  }, [initial, value, correct]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (initial === '-' && !game.gameLost) {
      const key = e.key;
      if (key.match(/^[1-9]$/)) {
        setBoardVal(key);
      } else if (key === 'Backspace' || key === 'Delete') {
        setBoardVal('-');
      }
    }
  };

  return (
    <input
      type="number"
      maxLength={1}
      className={`
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        bg-background text-foreground flex items-center justify-center text-center border-slate-800 border-solid w-full h-full
        ${cellBackground}
        ${(index % 9) % 3 === 2 ? 'border-r-2' : 'border-r'}
        ${Math.floor(index / 9) % 3 === 2 ? 'border-b-2' : 'border-b'}
      `}
      value={value !== '-' ? value : ''}
      onKeyDown={handleKeyDown}
      readOnly={initial !== '-'}
    />
  );
});

Cell.displayName = 'Cell';

export default Cell;