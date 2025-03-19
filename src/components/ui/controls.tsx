import React from 'react'

const Controls = () => {
  return (
    <div>
        <select name="difficulty" id="difficulty" defaultValue={'easy'}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <button>Start</button>
    </div>
  )
}

export default Controls