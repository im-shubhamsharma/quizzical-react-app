import React, { useState, useEffect } from "react";
const he = require("he");

export default function Answer(props) {
  let styles;
  if (props.quizStatus === "ongoing") {
    styles = {
      backgroundColor: props.isHeld ? "#D6DBF5" : "",
      border: props.isHeld ? "none" : "",
    };
  } else if (props.quizStatus === "play again") {
    if (props.isHeld && props.isCorrect) {
      styles = {
        backgroundColor: "#94D7A2",
        border: "none",
      };
    } else if (props.isHeld && !props.isCorrect) {
      styles = {
        backgroundColor: "#F8BCBC",
        border: "none",
      };
    } else if (props.isCorrect){
      styles = {
        backgroundColor: "#94D7A2",
        border: "none",
      };
    }
  }

  return (
    <>
      <p
        className="answer--elements"
        style={styles}
        onClick={() => props.selectOption(props.questionId, props.optionId)}
      >
        {he.decode(props.value)}
      </p>
    </>
  );
}
