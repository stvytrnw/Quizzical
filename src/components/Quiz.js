import React from "react";
import {useState, useEffect} from "react"

export default function Quiz(){
    const [questions, setQuestions] = useState()

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [])

    console.log(questions)

    return (
        <h1>Hello World</h1>
    )
}