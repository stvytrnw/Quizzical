import './App.css';
import React from "react"
import {useState} from "react"
import Start from "./components/Start"
import Quiz from './components/Quiz';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [apiValues, setApiValues] = useState({count: 1, catergory: 1, difficutly: ""})

  function startGame() {
    setStartQuiz(prevState => !prevState)
  }

  return (
    <main>
      { !startQuiz && <Start handleClick={startGame} items={apiValues} changeValues={setApiValues} />}
      { startQuiz && <Quiz values={apiValues} />}
    </main>
  );
}

export default App;
