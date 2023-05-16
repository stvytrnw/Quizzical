import React from "react";
import he from "he"
import {useState, useEffect} from "react"

export default function Quiz(){
    const [allQuestions, setAllQuestions] = useState()
    const [questions, setQuestions] = useState()

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [])

    useEffect(() => {
        if(allQuestions){
            const newArray = allQuestions.map(question => {
                return {...question, randomAnswers: question.incorrect_answers.concat(question.correct_answer)}
            })
            console.log(newArray)
        }
    }, [allQuestions])

    return (
        <>
             {allQuestions && <h1>{he.decode(allQuestions[0].question)}</h1>}
        </>
    )
}