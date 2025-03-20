import { GameContext } from '@/context/gameContext';
import { GameContextType } from '@/types/types';
import React, { useContext } from 'react';

interface CellProps {
  value: string;
  index: number;
  setBoardVal: (val: string) => void;
  correct: string;
  initial: string;
}

function Cell({ value, index, setBoardVal, correct, initial }: CellProps) {

  // const [isEditing, setIsEditing] = useState(false);

  const game = useContext<GameContextType | undefined>(GameContext);
  if (!game) {
    throw new Error('GameContext is undefined. Ensure the context provider is set.');
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (initial === '-' && !game.verify) {
      const key = e.key;
      if (key.match(/^[1-9]$/)) {
        setBoardVal(key);
        // setIsEditing(false);
      } else if (key === 'Backspace' || key === 'Delete') {
        setBoardVal('-');
        // setIsEditing(false);
      }
    }
  };

  return (
    <input
      className={`
        flex items-center justify-center text-center border-slate-800 border-solid
        ${initial !== '-' ? 'bg-gray-400' : ''}
        ${(index % 9) % 3 === 2 ? 'border-r-2' : 'border-r'}
        ${Math.floor(index / 9) % 3 === 2 ? 'border-b-2' : 'border-b'}
        ${game.verify && value !== correct && initial === '-' ? 'bg-red-500' : ''}
        ${game.verify && value === correct && initial === '-' ? 'bg-green-500' : ''}
      `}
      value={value !== '-' ? value : ''}
      onKeyDown={handleKeyDown}
      // onFocus={() => setIsEditing(true)}
      readOnly={initial !== '-'}
    />
  );
}

export default Cell;