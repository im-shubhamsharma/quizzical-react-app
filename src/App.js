import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import StartPage from "./components/StartPage";
import Button from "./components/Button";
import Loading from "./components/Loading";
import { nanoid } from "nanoid";
import Confetti from "./components/Confetti";

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
  const [quizData, setQuizData] = useState({
    data: [],
    loading: false,
  });

  useEffect(() => {
    if (quizStatus === "ongoing") {
      setQuizData((prevData) => ({
        ...prevData,
        loading: true,
      }));

      fetch(
        `https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple`
      )
        .then((response) => response.json())
        .then((actualData) =>
          setQuizData({
            data: getDesiredData(actualData.results),
            loading: false,
          })
        );
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
    setQuizData((prevData) => ({
      ...prevData,
      data: prevData.data.map((data) =>
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
      ),
    }));
  }

  // -------------------------------------------------------------------
  // function to check correct answers
  const [correctCount, setCorrectCount] = useState(0);

  function checkAnswers() {
    let count = 0;
    quizData.data.map((singleQuesitonData) => {
      singleQuesitonData.options.map((option) => {
        count += option.isHeld
          ? option.isHeld && option.isCorrect
            ? 1
            : 0
          : 0;
      });
    });
    setCorrectCount(count);
    quizStausToggle();
  }
  // -------------------------------------------------------------------

  const quizElement = quizData.data.map((quiz) => (
    <Quiz
      key={quiz.questionId}
      question={quiz.question}
      options={quiz.options}
      questionId={quiz.questionId}
      selectOption={selectOption}
      quizStatus={quizStatus}
    />
  ));

  console.log(quizData.data);

  return (
    <div>
      <Header />

      {correctCount === 5 && <Confetti />}

      <main>
        {quizData.loading && <Loading />}
        {/* <Loading /> */}

        {quizStatus === "start" && <StartPage />}

        {quizData.loading === false &&
          (quizStatus === "ongoing" || quizStatus === "play again") && (
            <div className="question--section">{quizElement}</div>
          )}

        <div className="button--result">
          {quizStatus === "play again" && (
            <p className="result">{`You scored ${correctCount}/5 correct answers`}</p>
          )}

          <Button
            quizStatus={quizStatus}
            handleChange={
              quizStatus === "ongoing" ? checkAnswers : quizStausToggle
            }
          />
        </div>
      </main>
    </div>
  );
}
