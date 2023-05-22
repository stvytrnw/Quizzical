import './App.css';
import React from "react"
import {useState} from "react"
import Start from "./components/Start"
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [apiValues, setApiValues] = useState({count: 1, category: '0', difficulty: '0'})

  function startGame() {
    setStartQuiz(prevState => !prevState)
  }

  return (
    <main>
      { !startQuiz && <Start handleClick={startGame} items={apiValues} setApiValues={setApiValues} />}
      { startQuiz && <Quiz values={apiValues} />}
    </main>
  );
}

export default App;
