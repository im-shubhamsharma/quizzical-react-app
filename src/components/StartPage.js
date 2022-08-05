import React from "react";
import Button from "./Button";

export default function StartPage(props) {
  // console.log("startpage component is running");
  return (
    <div className="startpage">
      <h1 className="title">Quizzical</h1>
      <h4 className="desc">A React web-app Trivia Game!</h4>
      
      {/* <Button title="Start Quiz" toggle={props.quizStausToggle}/> */}
    </div>
  );
}
