export interface GameContextProps {
  startDate: number
  difficulty: "easy" | "medium" | "hard"
  setDifficulty: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>
  board: string[]
  solution: string[]
  gameWon: boolean
  history?: string[][]
  gameReset: boolean
  lifeCount: number
  verify:boolean
}