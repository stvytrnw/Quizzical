import './App.css';
import React from "react"
import {useState, useEffect} from "react"
import Start from "./components/Start"
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  function startGame() {
    setStartQuiz(prevState => !prevState)
  }

  return (
    <main>
      { !startQuiz && <Start handleClick={startGame}/>}
      { startQuiz && <Quiz />}
    </main>
  );
}

export default App;
