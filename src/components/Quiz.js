import React from "react";
import he from "he"
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

                return {...question, randomAnswers: answersArray}
            }))
        }
    }, [allQuestions])

    const questionsHtml = questions.map(question => {
        const buttons = question.randomAnswers.map(answer => {
            return (
                <button>{answer}</button>
            )
        })
        return (
            <div>
                <h2>{he.decode(question.question)}</h2>
                {buttons}
            </div>
        )
    })

    return (
        <>
            {allQuestions && questionsHtml}
        </>
    )
}