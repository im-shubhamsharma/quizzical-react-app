import React, { useState, useEffect } from "react";
import Answer from "./Answer";

export default function Quiz(props) {
  const optionsArr = props.options;

  const optionElements = optionsArr.map((option) => (
    <Answer
      key={option.optionId}
      optionId={option.optionId}
      value={option.value}
      isCorrect={option.isCorrect}
      isHeld={option.isHeld}
      selectOption={props.selectOption}
      questionId={props.questionId}
      quizStatus={props.quizStatus}
    />
  ));

  return (
    <form className="question--container">
      <h4 className="question--title">{props.question}</h4>
      <div className="answer--container">{optionElements}</div>
      <hr className="separator" />
    </form>
  );
}
