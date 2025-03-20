export interface GameContextType {
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  startDate: number;
  board: string[];
  solution: string[];
  gameWon: boolean;
  gameReset: boolean;
  history: string[][];
  lifeCount: number;
  verify: boolean;
  gameLost: boolean;
}