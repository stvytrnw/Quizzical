import React from "react"

export default function Start(props){

    const categoriesArray = ["Any Category", "General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", 
    "Entertainment: Musicals and Theatres", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games", "Science & Nature",
    "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", 
    "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations"]

    const difficultyArray = ["Any Difficulty", "Easy", "Medium", "Hard"]

    const categoriesHTML = categoriesArray.map((category, index) => {
        return (
            <option key={category} value={category === "Any Category" ? 0 : index+8}>{category}</option>
        )
    })

    const difficultyHTML = difficultyArray.map(item => {
        return (
            <option key={item} value={item === "Any Difficulty" ? 0 : item}>{item}</option>
        )
    })

    return (
        <section className="start--section">
            <h1>Quizzical</h1>
            <input className="start--input" type="number" min="1" max="50" placeholder="1" onChange={(event) => props.setApiValues(prevState => {
                let { value, min, max } = event.target;
                value = Math.max(Number(min), Math.min(Number(max), Number(value)));
                return {...prevState, count: value}
            }) } />
            <select className="start--input" onChange={(event) => props.setApiValues(prevState => {
                return {...prevState, category: event.target.value}
            }) } >
               {categoriesHTML}
            </select>
            <select className="start--input" onChange={(event) => props.setApiValues(prevState => {
                return {...prevState, difficulty: event.target.value}
            })}>
                {difficultyHTML}
            </select>
            <button className="start--btn" onClick={props.handleClick}>Start quiz</button>
        </section>
    )
}