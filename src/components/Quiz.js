import React from "react";
import he from "he"
import {useState, useEffect} from "react"

export default function Quiz(){
    const [allQuestions, setAllQuestions] = useState()

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [])

    return (
        <>
             {allQuestions && <h1>{he.decode(allQuestions[0].question)}</h1>}
        </>
    )
}