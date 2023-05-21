import React from "react"

export default function Start(props){

    const categoriesArray = ["Any Category", "General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", 
    "Entertainment: Musicals and Theatres", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games", "Science & Nature",
    "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", 
    "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations"]

    const categoriesHTML = categoriesArray.map((category, index) => {
        return (
            <option value={index} onChange={() => props.setApiValues(prevState => {
                return {...prevState, category: index}
            })}>{category}</option>
        )
    })

    return (
        <section className="start--section">
            <h1>Quizzical</h1>
            <input type="number" min="1" max="50" value={props.items.count} onChange={() => props.setApiValues(prevState => {
                return {...prevState, count: prevState.count +1}
            }) } />
            <select>
               {categoriesHTML}
            </select>
            <button className="start--btn" onClick={props.handleClick}>Start quiz</button>
        </section>
    )
}