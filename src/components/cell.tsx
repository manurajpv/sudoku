import { GameContext } from '@/context/gameContext';
import React, { useContext, useState } from 'react';

function Cell({
  value,
  index,
  setBoardVal,
  correct,
  initial,
}: {
  value: string;
  index: number;
  setBoardVal: (val: string) => void;
  correct: string;
  initial: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { verify } = useContext(GameContext)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    console.log(key)
    if (key.match(/^[1-9]$/)) {
      // If a valid number is pressed, update the cell value
      setBoardVal(key);
      setIsEditing(false); // Exit editing mode
    } else if (key === 'Backspace' || key === 'Delete') {
      // Clear the cell on Backspace or Delete
      setBoardVal('-');
      setIsEditing(false); // Exit editing mode
    }
  };

  const handleFocus = () => {
    // Enable editing mode when the cell is clicked
    setIsEditing(true);
  };

  return (
    <input
      className={
        'flex items-center justify-center text-center border-slate-800 border-solid' +
        (initial !== '-' ? ' bg-gray-400' : '') +
        ((index % 9) % 3 === 2 ? ' border-r-2' : ' border-r') +
        (Math.floor(index / 9) % 3 === 2 ? ' border-b-2' : ' border-b') +
        ((verify && value !==correct && initial ==='-') ? ' bg-red-500' : '')
      }
      value={value !== '-' ? value : ''} // Display empty string for empty cells
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      readOnly={initial !== '-'} // Prevent editing if the cell is an initial value
    />
  );
}

export default Cell;