import { useState } from 'react';
import Board from './components/board';
import { Button } from './components/ui/button';
import { GameContext } from './context/gameContext';
import DifficultyDropdown from './components/ui/difficulty_dropdown';
import { generateBoard } from './lib/utils';
import { RefreshCw } from 'lucide-react';

function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [puzzle, setPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const handleStart = () => {
    const { puzzle, solution } = generateBoard(difficulty);
    setPuzzle(puzzle);
    setSolution(solution);
    console.log(puzzle, solution)
  };
  const verifyBoard = () => {
    setVerify(true)
    setTimeout(() => {
      setVerify(false);
    },5000);
  }
  return (
    <main className="w-full h-full">
      <header className="w-full text-gray-950 h-20 flex items-center px-4">
        <span>Sudoku</span>
      </header>
      <GameContext.Provider
        value={{
          difficulty,
          setDifficulty,
          startDate: Date.now(),
          board: [puzzle],
          solution: [solution],
          gameWon: false,
          gameReset: false,
          history: [],
          lifeCount: 3,
          verify: verify
        }}
      >
        <section className="w-full p-4 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <DifficultyDropdown setDifficulty={setDifficulty} />
            </div>
            <div>
              <Button onClick={handleStart}>{(puzzle && solution) ? "Restart" : "Start Game"}</Button>
            </div>
          </div>
        </section>
        {puzzle && (
          <>
            <div className="flex justify-center">
              <Board />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={verifyBoard}
                variant="secondary"
              >Check Solution<RefreshCw /></Button>
            </div>
          </>
        )}
      </GameContext.Provider>
    </main>
  );
}

export default App;
