import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const receivedAnsArray = props.answer;
  const [ansArray, setAnsArray] = useState(newAnsObjArray(receivedAnsArray));

  //function to convert recived ans array into an array of object containing necessary information
  function newAnsObjArray(receivedAnsArray) {
    let tempArr = [];
    for (let i = 0; i < 4; i++) {
      tempArr.push({
        value: receivedAnsArray[i],
        isHeld: false,
        id: nanoid(),
      });
    }
    return tempArr;
  }

  //converting ans array into array of elements
  const ansArrayElements = ansArray.map((ans) => (
    <Answer
      key={ans.id}
      value={ans.value}
      id={ans.id}
      isHeld={ans.isHeld}
      selectAns={selectAns}
    />
  ));

  //selction option for ans
  function selectAns(id) {
    setAnsArray((prevAnsArray) =>
      prevAnsArray.map((ans) =>
        ans.id === id ? { ...ans, isHeld: !ans.isHeld } : ans
      )
    );
  }

  return (
    <form className="question--container">
      <h4 className="question--title">{props.question}</h4>
      <div className="answer--container">{ansArrayElements}</div>
      <hr className="separator" />
    </form>
  );
}
