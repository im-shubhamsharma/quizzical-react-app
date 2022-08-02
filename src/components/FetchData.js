import React, { useState, useEffect } from "react";
import {nanoid} from "nanoid"

export default function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // data fetching here
    fetch(`https://opentdb.com/api.php?amount=6&type=multiple`)
      .then((response) => response.json())
      .then((actualData) => setData(actualData.results));
  }, []);

  function getDesiredData(data) {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      let randomNumber = Math.floor(Math.random() * 4);
      let question = data[i].question;
      let correctAnswer = data[i].correct_answer;
      let incorrectAnswerArray = data[i].incorrect_answers;
      incorrectAnswerArray.splice(randomNumber, 0, correctAnswer);
      tempArr.push({
        questionId: nanoid(),
        question: question,
        correctAnswer: correctAnswer,
        answerOptions: incorrectAnswerArray,
      });
    }
    return tempArr;
  }

  console.log(getDesiredData(data));

  return (
    <>
      <p>Hello</p>
    </>
  );
}
