import React from "react";
import he from "he"
import { nanoid } from 'nanoid'
import {useState, useEffect} from "react"

export default function Quiz(){
    const [allQuestions, setAllQuestions] = useState()
    const [questions, setQuestions] = useState([])
    const [finishedGame, setFinishedGame] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [])

    useEffect(() => {
        if(allQuestions){
            setQuestions(allQuestions.map(question => {
                let answersArray = question.incorrect_answers.concat(question.correct_answer)
                let currentIndex = answersArray.length, randomIndex;

                while (currentIndex !== 0){
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [answersArray[currentIndex], answersArray[randomIndex]] = [answersArray[randomIndex], answersArray[currentIndex]];
                }

                return {...question, randomAnswers: answersArray, id: nanoid()}
            }))
        }
    }, [allQuestions])
    
    function setAnswer(e) {
        setQuestions(prevState => prevState.map(question => {
            return question.id === e.target.name ?
            {...question, selectedAnswer: e.target.innerHTML} :
            {...question}
        }))
    }

    const questionsHtml = questions.map(question => {
        const buttons = question.randomAnswers.map(answer => {

            function getBackgroundColor() {
                if(finishedGame){
                    if(he.decode(question.correct_answer) ===  he.decode(answer)){
                        return "#94D7A2"
                    }else if (question.selectedAnswer ===  he.decode(answer)) {
                        return "#F8BCBC"
                    }
                } else {
                    return question.selectedAnswer === he.decode(answer) ? "#D6DBF5" : "transparent"
                }
            }

            return (
                    <button 
                    onClick={setAnswer} 
                    style={{backgroundColor: getBackgroundColor(),
                    borderColor: question.selectedAnswer === he.decode(answer) ? "#D6DBF5" : "#293264",
                    opacity: finishedGame && "50%"}} 
                    name={question.id}>{he.decode(answer)}
                    </button>
            )
        })
        return (
            <div key={nanoid()} className="quiz--questions_cnt">
                <h2>{he.decode(question.question)}</h2>
                <div className="quiz--btn_cnt">
                    {buttons}
                </div>
            </div>
        )
    })

    function checkQuestions() {
        setFinishedGame(prevState => !prevState)
        console.log(finishedGame)
    }

    return (
        <div>
            {allQuestions && questionsHtml}
            <button onClick={checkQuestions}>Check anwers</button>
        </div>
    )
}