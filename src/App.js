import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [data, setData] = useState([]);

  // data fetching here--------------------------------------------------
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=6&type=multiple`)
      .then((response) => response.json())
      .then((actualData) => setData(getDesiredData(actualData.results)));
  }, []);
  //----------------------------------------------------------------------

  function getDesiredData(data) {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      let randomNumber = Math.floor(Math.random() * 4);
      let question = data[i].question;
      //-------------------------
      let correctAnswer = data[i].correct_answer;
      let correctAnswerObj = {
        value: correctAnswer,
        isCorrect: true,
        optionId: nanoid(),
        isHeld: false,
      };
      //-------------------------
      let optionsArray = data[i].incorrect_answers;
      let optionsArrayObj = optionsArray.map((value) => ({
        value: value,
        isCorrect: false,
        optionId: nanoid(),
        isHeld: false,
      }));
      //-------------------------
      optionsArrayObj.splice(randomNumber, 0, correctAnswerObj);
      //-------------------------
      tempArr.push({
        questionId: nanoid(),
        question: question,
        options: optionsArrayObj,
        correctAnswer: correctAnswer,
      });
    }
    return tempArr;
  }

  //state to store options
  const [options, setOptions] = useState([]);

  //-----------------------------------------------------------------
  //function to get option array data
  // function updateOptions() {
  //   const tempArr = data.map((value) => value.options);
  //   setOptions(tempArr);
  // }

  // useEffect(() => {
  //   updateOptions();
  // }, [data]);

  // console.log(options);
  //-----------------------------------------------------------------

  //below functin is used to select options uniquely as we are also matching question id before selecting an option
  function selectOption(questionId, optionId) {
    setData((prevData) =>
      prevData.map((data) =>
        questionId === data.questionId 
          ? {
              ...data,
              options: data.options.map((option) =>
              optionId === option.optionId
                  ? { ...option, isHeld: true }
                  : { ...option, isHeld: false }
              ),
            }
          : data
      )
    );
  }
  // -------------------------------------------------------------------

  

  const quizElement = data.map((quiz) => (
    <Quiz
      key={quiz.questionId}
      question={quiz.question}
      options={quiz.options}
      questionId={quiz.questionId}
      selectOption={selectOption}
    />
  ));

  return (
    <main>
      <div className="question--section">{quizElement}</div>
      <button className="button">Check Answers</button>
      {/* <FetchData /> */}
    </main>
  );
}
