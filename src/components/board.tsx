import React, { useEffect, useRef } from 'react';
import Cell from './cell'

function Board() {
  const board = useRef(['41--75-----53--7--2-36-81--7-9--25-1-3--9-47--2-1-7---6587--9-----26-8--1925---47']);
  const initialBoard = useRef(board.current);
  const solution = '416975238985321764273648159769432581531896472824157396658714923347269815192583647';
  // let boardValues = board[0].split('');
  const boardValues = useRef(board.current[0].split(''));
  const history = useRef([board.current])
  // const [boardValues, setBoardValues] = React.useState<string[]>(board[0].split(''))
  // setBoardValues(board[0].split(''))
  const [boardVal, setBoardVal] = React.useState([-1, -1])
  useEffect(() => {
    console.log(board)
    const boardArray = board.current[0].split('')
    boardArray[boardVal[0]] = boardVal[1].toLocaleString()
    boardValues.current = boardArray
    board.current = [boardArray.join('')]
    history.current = [...history.current, board.current]
    console.log(history)
    // setBoardValues(boardArray)
  }, [boardVal])
  return (
    <div className='grid grid-cols-9 grid-rows-9 w-96 h-96 m-4 border-2 border-solid border-slate-800'>
      {boardValues && boardValues.current.map((value, index) => {
        return (<Cell key={index} value={value} index={index} setBoardVal={setBoardVal} correct={solution[index]} initial={initialBoard.current[0][index]}/>)
      })}
    </div>
  )
}

export default Board