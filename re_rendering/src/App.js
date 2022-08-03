import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });
  const [allClicks, setAllClicks] = useState([]);

  // const increaseByOne = () => setCounter(counter + 1);
  // const decreaseByOne = () => setCounter(counter === 0 ? 0 : counter - 1);
  // const setToZero = () => setCounter(0);

  const setToValue = (newValue) => () => setCounter(newValue);
  
  return (
    <>
      <Display counter={counter} />
      <Button 
        onClick={setToValue(counter + 1)} 
        value="Plus" />
      <Button 
        onClick={setToValue(counter === 0 ? 0 : counter - 1)} 
        value="Minus" />
      <Button 
        onClick={setToValue(1000)} 
        value="Thousand" />
      <Button 
        onClick={setToValue(0)} 
        value="Reset" />
    </>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, value}) => 
  <button onClick={onClick}>
    {value}
  </button>

export default App
