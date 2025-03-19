import { useEffect, useState } from 'react';
import Board from './components/board';
import { Button } from './components/ui/button';
import { GameContext } from './context/gameContext';
import DifficultyDropdown from './components/ui/difficulty_dropdown';
import { generateBoard } from './lib/utils';
import { Heart, RefreshCw } from 'lucide-react';
import logo from "./assets/game.svg"
function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [puzzle, setPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const [lifeCount, setLifeCount] = useState<number>(3);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const handleStart = () => {
    const { puzzle, solution } = generateBoard(difficulty);
    setPuzzle(puzzle);
    setSolution(solution);
    setGameLost(false);
    console.log(puzzle, solution)
  };
  const verifyBoard = () => {
    setVerify(true);
    setLifeCount(lifeCount - 1);
    setTimeout(() => {
      setVerify(false);
    }, 5000);
  }
  useEffect(() => {
    if (lifeCount === 0) {
      setPuzzle('');
      setGameLost(true)
      setSolution('');
      setLifeCount(3);
    }
  }, [lifeCount])
  return (
    <main className="w-full h-full">
      <header className="w-full text-gray-950 h-20 flex items-center px-4">
        <div className='flex items-center gap-2 px-2'>
          <img width={36} src={logo} alt="Sudoku Logo" />
          <span className='font-bold text-2xl'>Sudoku</span>
        </div>
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
          lifeCount: lifeCount,
          verify: verify,
          gameLost: gameLost
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
            <div className="flex justify-center items-center gap-4">
              <div className='mx-2 flex flex-row gap-1'>
                {lifeCount}
                <Heart />
              </div>
              <Button
                onClick={verifyBoard}
                variant="secondary"
              >Check Solution<RefreshCw /></Button>
            </div>
          </>
        )}
        {gameLost && (
          <>
            <div className='flex justify-center'>
              <h1 className='text-2xl font-semibold text-red-500 my-4'> Game Over</h1>
            </div>
          </>
        )}
      </GameContext.Provider>
    </main>
  );
}

export default App;
