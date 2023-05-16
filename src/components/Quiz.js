import React from "react";
import he from "he"
import { nanoid } from 'nanoid'
import {useState, useEffect} from "react"

export default function Quiz(){
    const [allQuestions, setAllQuestions] = useState()
    const [questions, setQuestions] = useState([])

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
        console.log(e)
        setQuestions(prevState => prevState.map(question => {
            return question.id == e.target.name ?
            {...question, selectedAnswer: e.target.innerHTML} :
            {...question}
        }))
    }

    const questionsHtml = questions.map(question => {
        const buttons = question.randomAnswers.map(answer => {
            return (
                <>
                    <button 
                    onClick={setAnswer} 
                    style={{backgroundColor: question.selectedAnswer == he.decode(answer) ? "#D6DBF5" : "transparent", 
                    borderColor: question.selectedAnswer == he.decode(answer) ? "#D6DBF5" : "#293264"}} 
                    name={question.id}>{he.decode(answer)}
                    </button>
                </>
            )
        })
        return (
            <div key={nanoid()} className="quiz--questions_cnt">
                <h2>{he.decode(question.question)}</h2>
                {buttons}
            </div>
        )
    })

    return (
        <div className="quiz--cnt">
            {allQuestions && questionsHtml}
        </div>
    )
}