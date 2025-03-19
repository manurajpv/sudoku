import { GameContextProps } from "@/types/types";
import React from "react";


export const GameContext = React.createContext<GameContextProps | undefined>(undefined);

// {
//     difficulty: 'easy',
//     startDate: Date.now(),
//     board: [],
//     gameWon: false,
//     gameReset: false,
//     lifeCount: 3,
//     history:[]
// }