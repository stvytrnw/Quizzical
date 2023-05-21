import React from "react";
import he from "he"
import { nanoid } from 'nanoid'
import {useState, useEffect} from "react"

export default function Quiz(props){
    const [allQuestions, setAllQuestions] = useState()
    const [questions, setQuestions] = useState([])
    const [finishedGame, setFinishedGame] = useState(false)
    const [fetchApi, setFetchApi] = useState(false)
    let score = 0

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${props.values.count}`)
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [fetchApi])

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

    useEffect(() => {
        if(!finishedGame){
            setFetchApi(prevState => !prevState)
        } 
    }, [finishedGame])
    
    function setAnswer(e) {
        setQuestions(prevState => prevState.map(question => {
            return question.id === e.target.name ?
            {...question, selectedAnswer: he.decode(e.target.innerHTML)} :
            {...question}
        }))
        console.log(questions)
    }

    const questionsHtml = questions.map(question => {
        const buttons = question.randomAnswers.map(answer => {

            if(he.decode(question.correct_answer) ===  he.decode(answer) && question.selectedAnswer ===  he.decode(answer)) {
                score++
            }

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
                    disabled={finishedGame}
                    style={{backgroundColor: getBackgroundColor(),
                    borderColor: question.selectedAnswer === he.decode(answer) ? "#D6DBF5" : "#293264",
                    opacity: finishedGame && answer !== question.correct_answer ? "50%" : "100%"}} 
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

    function changeFinishedGame() {
        setFinishedGame(prevState => !prevState)
    }

    return (
        <div className="quiz--cnt">
            {allQuestions && questionsHtml}
            {finishedGame && <p className="quiz--score">You scored {score}/5 correct answers</p>}
            <button className="quiz--finish_btn" onClick={changeFinishedGame}>{!finishedGame ? "Check Answers" : "Play Again"}</button>
        </div>
    )
}