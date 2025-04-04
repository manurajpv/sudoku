import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSudoku } from 'sudoku-gen';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBoard(difficulty:'baby' |  'easy' | 'medium' | 'hard') {
  difficulty = difficulty === 'baby' ? 'easy' : difficulty;
  return getSudoku(difficulty);
}