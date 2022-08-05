import React from "react"

export default function Button(props){
   return(
      <button className="button" onClick={props.handleChange}>
          {props.quizStatus === "start" ? "Start Quiz" :
           (props.quizStatus === "ongoing" ? "Check Answers" : "Play Again" )}
      </button>
   )
}