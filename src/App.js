import React, { useState, useEffect } from "react";
import Questions from "./components/Questions.js";
import { nanoid } from "nanoid";
import data from "./data";

export default function App() {
  const [questionAnsArray, setQuestionAnsArray] = useState(
    newQuestionAnsObjArray(data)
  );

   //function to convert recived data array into an array of object containing necessary information
  function newQuestionAnsObjArray(data) {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      tempArr.push({
        question: data[i].Questions,
        answer: data[i].Answer,
        id: nanoid(),
      });
    }
    return tempArr;
  }

  //converting question answer array into array of elements
  const questionAnsElements = questionAnsArray.map((ques) => (
    <Questions 
      key={ques.id}
      question={ques.question} 
      answer={ques.answer} 
    />
  ));

  console.log(questionAnsArray);

  return (
    <main>
      <div className="question--section">{questionAnsElements}</div>
      <button className="button">Check Answers</button>
    </main>
  );
}
