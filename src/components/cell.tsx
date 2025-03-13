import React, { useEffect, useMemo } from 'react'

function Cell({ value, index, setBoardVal, correct, initial }: { value: string, index: number, setBoardVal: React.Dispatch<React.SetStateAction<number[]>>, correct: string, initial: string }) {
  const [focused, setFocused] = React.useState(false);
  const [inputVal, setInputVal] = React.useState(value);
  const keyPressListener = ({ key }: { key: string }) => {
    if (isFinite(parseInt(key)) && parseInt(key) > 0 && parseInt(key) < 10 && key != "") setBoardVal([index, parseInt(key)]);
    else setInputVal("")
  };
  const memoizedListener = useMemo(() => keyPressListener, []);
  const handleClick = () => {
    if (value === "-") {
      setFocused(true)
    } else {
      console.log("Cell has value")
    }
  }
  useEffect(() => {
    if (focused) {
      console.log('add event listener');
      window.addEventListener('keydown', memoizedListener);
    } else {
      console.log('remove event listener');
      window.removeEventListener('keydown', memoizedListener);
    }
  }, [focused, memoizedListener]);
  return (
    // <div className='flex items-center justify-center p-4 border-2 border-slate-800 border-solid'
    //   onClick={handleClick}
    //   onBlur={() => setFocused(false)}
    //   tabIndex={0}>
    //   {value != "-" ? value : ""}
    // </div>
    <input
      className={'flex items-center justify-center text-center border-2 border-slate-800 border-solid' + (correct === value ? ' bg-green-200' : '') + (initial!=="-" ? ' bg-gray-400' : '')}
      value={inputVal != "-" ? inputVal : ""} onChange={(e) => { setInputVal(e.target.value); keyPressListener({ key: e.target.value }) }}
      readOnly={(value != '-' || correct === value) ? true : false}
    />
  )
}

export default Cell