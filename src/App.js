import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import StartPage from "./components/StartPage";
import { nanoid } from "nanoid";

export default function App() {
  // -------------------------------------------------------------------
  const [quizStatus, setQuizStatus] = useState("start");
  function quizStausToggle() {
    setQuizStatus((prevState) => {
      if (prevState === "start") return "ongoing";
      if (prevState === "ongoing") return "play again";
      if (prevState === "play again") return "ongoing";
    });
  }
  // -------------------------------------------------------------------
  // Data Fetch Request to API 
  const [data, setData] = useState([]);

  useEffect(() => {
    if (quizStatus == "ongoing") {
      fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple`)
        .then((response) => response.json())
        .then((actualData) => setData(getDesiredData(actualData.results)));
    }
  }, [quizStatus]);

  //----------------------------------------------------------------------
  // Filter desired data from API
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
  const [correctCount, setCorrectCount] = useState(0);

  function checkAnswers(data) {
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      let singleQuestionData = data[i];
      let correctAnswer = singleQuestionData.correctAnswer;
      let optionsData = data[i].options;
      for (let j = 0; j < optionsData.length; j++) {
        let singleOptionData = optionsData[j];
        if (singleOptionData.isHeld) {
          if (singleOptionData.value === correctAnswer) {
            count++;
          }
        }
      }
    }
    setCorrectCount(count);
    quizStausToggle();
  }

  const quizElement = data.map((quiz) => (
    <Quiz
      key={quiz.questionId}
      question={quiz.question}
      options={quiz.options}
      questionId={quiz.questionId}
      selectOption={selectOption}
      quizStatus={quizStatus}
    />
  ));

  console.log(data);

  return (
    <main>
      {quizStatus === "start" && <StartPage />}

      {(quizStatus === "ongoing" || quizStatus === "play again") && (
        <div className="question--section">{quizElement}</div>
      )}

      <div className="button--result">
        {quizStatus === "play again" && (
          <p className="result">{`You scored ${correctCount}/5 correct answers`}</p>
        )}
        {quizStatus === "ongoing" && (
          <button className="button" onClick={() => checkAnswers(data)}>
            Check Answers
          </button>
        )}
        {(quizStatus === "start" || quizStatus === "play again") && (
          <button className="button" onClick={() => quizStausToggle()}>
            {" "}
            {quizStatus === "start" ? "Start Quiz" : "Play Again"}
          </button>
        )}
      </div>

      {/* <FetchData /> */}
    </main>
  );
}
