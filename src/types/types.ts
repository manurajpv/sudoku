export interface GameContextType {
  difficulty: 'baby' |'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'baby' | 'easy' | 'medium' | 'hard') => void;
  startDate: number;
  board: string[];
  solution: string[];
  gameWon: boolean;
  setGameWon: (won: boolean) => void;
  gameReset: boolean;
  history: string[][];
  lifeCount: number;
  gameLost: boolean;
}