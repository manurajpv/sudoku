import { useContext, useEffect, useState } from 'react';
import Board from './components/board';
import { Button } from './components/ui/button';
import { GameContext } from './context/gameContext';
import DifficultyDropdown from './components/ui/difficulty_dropdown';
import { generateBoard } from './lib/utils';
import { Heart, Lightbulb } from 'lucide-react';
import logo from "./assets/game.svg"
import { useToast } from './hooks/use-toast';
import { ConfettiFireworks } from './components/ui/win-confetti';
import { useStopwatch } from 'react-timer-hook';
import { motion } from 'motion/react';
import Themetoggle from './components/ui/theme-toggle';
import HighScores from './components/highscore';
function App() {
  const [difficulty, setDifficulty] = useState<'baby' |'easy' | 'medium' | 'hard'>('easy');
  const [puzzle, setPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [lifeCount, setLifeCount] = useState<number>(3);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [viewScores, setViewScores] = useState<boolean>(false)
  const { toast } = useToast()

  const handleStart = () => {
    setPuzzle('')
    const { puzzle, solution } = generateBoard(difficulty);
    setTimeout(() => {
      setPuzzle(puzzle);
    }, 100);
    setSolution(solution);
    setGameWon(false);
    setGameLost(false);
    setLifeCount(3)
  };
  const showHint = () => {
    if (!gameWon) {  // Add check to prevent multiple verifications
      if (lifeCount > 0) {
        setLifeCount(prev => prev - 1);
      }else{
        toast({
          description: "Sorry, You are out of lives.",
        })
      }
    }
  };
  
  return (
    <main className="w-full h-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <header className="w-full text-gray-950 h-20 flex items-center px-4">
          <div className='flex items-center px-2 justify-between w-full'>
            <div className='flex items-center gap-2'>
              <img width={36} src={logo} alt="Sudoku Logo" />
              <span className='font-bold text-2xl text-foreground'>Sudoku</span>
            </div>
            <div className='flex gap-2'>
              <Button variant={"secondary"} onClick={() => { setViewScores(!viewScores) }}>{viewScores ? "Play Game" : "Previous Scores"}</Button>
              <Themetoggle />
            </div>
          </div>
        </header>
      </motion.div>
      <GameContext.Provider
        value={{
          difficulty,
          setDifficulty,
          startDate: Date.now(),
          board: [puzzle],
          solution: [solution],
          gameWon: gameWon,
          gameReset: false,
          history: [],
          lifeCount: lifeCount,
          gameLost: gameLost,
          setGameWon: setGameWon
        }}
      >
        {!viewScores && <section className="w-full p-4 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <DifficultyDropdown setDifficulty={setDifficulty} />
            </div>
            <div>
              <Button onClick={handleStart}>{(puzzle || solution) ? "Restart" : "Start Game"}</Button>
            </div>
          </div>
          {puzzle && solution && (<div>
            <CountDown />
          </div>)}
        </section>}
        <section>
          {puzzle && !viewScores && (
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
                  onClick={showHint}
                  variant="secondary"
                >Show Hint<Lightbulb /></Button>
              </div>
            </>
          )}
          {gameLost && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            >
              <div className='flex justify-center h-48 items-center'>
                <h1 className='text-2xl  bg-red-500 px-4 py-2 rounded-md font-semibold text-white my-4'>Game Over. Try Again?</h1>
              </div>
            </motion.div>
          )}
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            >
              <div className='flex justify-center'>
                <h1 className='text-2xl bg-green-500  px-4 py-2 rounded-md font-semibold text-white my-4'> Yaay.. You Won!!!</h1>
              </div>
            </motion.div>
          )}
          <ConfettiFireworks gameWon={gameWon} />
        </section>
      </GameContext.Provider>
      {viewScores && <div className='flex justify-center gap-4 mt-4'>
        <div className='w-full lg:w-1/3 px-2'>
          <HighScores />
        </div>
      </div>}
    </main>
  );
}

function CountDown() {
  const {
    hours,
    seconds,
    minutes
  } = useStopwatch({ autoStart: true, interval: 20 });

  const game = useContext(GameContext);
  if (!game) {
    throw new Error('GameContext is undefined. Ensure the context provider is set.');
  }
  useEffect(() => {
    if (game.gameWon) {
      let scores = JSON.parse(localStorage.getItem("sudoku-scores") || "[]");
      const score = { difficulty: game.difficulty, time: `${minutes}:${seconds}` }
      scores = [...scores, score]
      localStorage.setItem("sudoku-scores", JSON.stringify(scores))
    }
  }, [game.gameWon])

  return (
    <div className='text-center h-full'>
      <div className='text-3xl text-semibold'>
        <span>{hours}</span>:<span>{minutes.toLocaleString().length < 2 ? "0" + minutes.toLocaleString() : minutes}</span>:<span>{seconds.toLocaleString().length < 2 ? "0" + seconds.toLocaleString() : seconds}</span>
      </div>
    </div>
  );
}
export default App;
