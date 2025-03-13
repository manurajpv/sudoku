export interface GameContextProps {
  startDate: number
  difficulty: string
  board: string[]
  gameWon: boolean
  history?: string[][]
  gameReset: boolean
  lifeCount: number
}