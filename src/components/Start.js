import React from "react"

export default function Start(props){

    console.log(props)

    return (
        <section className="start--section">
            <h1>Quizzical</h1>
            <input type="number" min="1" max="50" value={props.items.count} />
            <select>
                <option></option>
            </select>
            <button className="start--btn" onClick={props.handleClick}>Start quiz</button>
        </section>
    )
}