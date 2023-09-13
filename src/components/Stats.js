import React from "react";
import "../styles/Stats.css";
import { AiOutlineCloseSquare } from "react-icons/ai";

class Stats extends React.Component {
  render() {
    let wrongGuesses = this.props.guesses.map((item) => {
      if (!item.correct) {
        return (
          <span className="wrong-icon">
            <AiOutlineCloseSquare />
          </span>
        );
      }
    });
    return (
      <div>
        {this.props.question !== "" && (
          <div className="stats-container">
            <div>
              Answers Left: {this.props.answers.length - this.props.correct}/
              {this.props.answers.length}
            </div>
            <div>Wrong Guesses: {wrongGuesses}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Stats;
