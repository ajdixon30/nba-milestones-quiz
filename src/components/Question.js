import React from "react";
import "../styles/Question.css";

const Question = (props) => {
  return (
    <div className="question-container">
      <div className="question-text">{props.question}</div>
    </div>
  );
};

export default Question;
