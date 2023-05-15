import React from "react"

export default function Start({handleClick}){
    return (
        <section className="start--section">
            <h1>Quizzical</h1>
            <button className="start--btn" onClick={handleClick}>Start quiz</button>
        </section>
    )
}