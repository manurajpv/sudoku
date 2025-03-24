import { useEffect, useState } from 'react';
import Board from './components/board';
import { Button } from './components/ui/button';
import { GameContext } from './context/gameContext';
import DifficultyDropdown from './components/ui/difficulty_dropdown';
import { generateBoard } from './lib/utils';
import { Heart, RefreshCw } from 'lucide-react';
import logo from "./assets/game.svg"
import { useToast } from './hooks/use-toast';
import { ConfettiFireworks } from './components/ui/win-confetti';
import { useTimer } from 'react-timer-hook';
import { motion } from 'motion/react';
import Themetoggle from './components/ui/theme-toggle';
function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [puzzle, setPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const [lifeCount, setLifeCount] = useState<number>(3);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<Date>(new Date());
  const { toast } = useToast()

  const handleStart = () => {
    const time = new Date();
    switch (difficulty) {
      case 'hard':
        time.setSeconds(time.getSeconds() + 900);
        break;
      case 'medium':
        time.setSeconds(time.getSeconds() + 600);
        break;
      case 'easy':
        time.setSeconds(time.getSeconds() + 300);
        break;
    }
    setPuzzle('')
    const { puzzle, solution } = generateBoard(difficulty);
    setTimeout(() => {
      setPuzzle(puzzle);
    }, 100);
    setSolution(solution);
    setGameWon(false);
    setGameLost(false);
    setLifeCount(3)
    setTimer(time)
  };
  const verifyBoard = () => {
    if (!verify && !gameWon) {  // Add check to prevent multiple verifications
      if (lifeCount > 0) {
        setVerify(true);
        setLifeCount(prev => prev - 1);
        setTimeout(() => {
          setVerify(false);
        }, 3000);
      }
    }
  };
  useEffect(() => {
    if (lifeCount === 0 && verify) {
      toast({
        description: "Sorry, You are out of lives.",
      })
    }
  }, [lifeCount, verify])
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
            <div>
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
          verify: verify,
          gameLost: gameLost,
          setGameWon: setGameWon
        }}
      >
        <section className="w-full p-4 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <DifficultyDropdown setDifficulty={setDifficulty} />
            </div>
            <div>
              <Button onClick={handleStart}>{(puzzle || solution) ? "Restart" : "Start Game"}</Button>
            </div>
          </div>
          {puzzle && solution && (<div>
            <CountDown expiryTimestamp={timer} setGameLost={setGameLost} puzzle={puzzle} />
          </div>)}
        </section>
        <section>
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
    </main>
  );
}

function CountDown({ expiryTimestamp, setGameLost, puzzle }: { expiryTimestamp: Date, setGameLost: React.Dispatch<React.SetStateAction<boolean>>, puzzle: string }) {
  const {
    seconds,
    minutes
  } = useTimer({ expiryTimestamp, onExpire: () => { if (puzzle) setGameLost(true) }, interval: 20 });


  return (
    <div className='text-center'>
      <div className='text-3xl text-semibold'>
        <span>{minutes.toLocaleString().length < 2 ? "0" + minutes.toLocaleString() : minutes}</span>:<span>{seconds.toLocaleString().length < 2 ? "0" + seconds.toLocaleString() : seconds}</span>
      </div>
    </div>
  );
}
export default App;
