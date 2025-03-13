import { useState } from "react"
import Board from "./components/board"
import { Button } from "./components/ui/button"
import { GameContext } from "./context/gameContext"
import DifficultyDropdown from "./components/ui/difficulty_dropdown"

function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  return (
    <main className="w-full h-full">
      {/* <header className="w-full text-gray-950 h-20 flex items-center px-4">
        <span>Sudoku</span>
      </header>
      <section className="w-full p-4 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <DifficultyDropdown setDifficulty={setDifficulty} />
          </div>
          <div>
            <Button>Start Game</Button>
          </div>
        </div>
      </section> */}
      <GameContext.Provider value={{
        difficulty,
        startDate: Date.now(),
        board: [],
        gameWon: false,
        gameReset: false,
        history: [],
        lifeCount: 3
      }}>
        <div className="flex justify-center">
          <Board />
        </div>
      </GameContext.Provider>
    </main>
  )
}

export default App
