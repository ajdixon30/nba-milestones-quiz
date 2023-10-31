//     "Which NBA players have made 24+ field goals in a single game?",
//     "Which NBA players have made 24+ free throws in a single game?",
//     "Which NBA players have recorded 50+ triple-doubles in their careers?",
//     "Which NBA players have had a free-throw percentage of 94%+ in a single-season?",
//     "Which NBA players have finished a season with a 3P% of 50% or greater?",
//     "Which NBA players have recorded 4 blocks per game in a single season?",
//     "Which NBA players have recorded 3 steals per game in a single season?",
//     "Which NBA players have playoff 3P% of 45% or greater?"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AnswersTable from "./components/AnswersTable";
import StartGame from "./components/StartGame";
import Question from "./components/Question";
import GuessInput from "./components/GuessInput";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getNewQuestion = this.getNewQuestion.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleGuesses = this.handleGuesses.bind(this);
    this.state = {
      question: "",
      answers: [],
      wrong: 0,
      correct: 0,
      guesses: [],
    };
  }
  getNewQuestion = async () => {
    let id = Math.floor(Math.random() * 8) + 1;
    console.log(id);
    const response = await fetch(`http://localhost:3004/questions?id=${id}`);

    const data = await response.json();

    console.log(data[0]);

    await this.handleState(data[0]);
  };
  handleState = (data) => {
    this.setState(() => ({
      answers: data.answers,
      question: data.question,
      wrong: 0,
      correct: 0,
      guesses: [],
    }));
  };
  handleGuesses = (guess) => {
    let correctGuess = false;
    let numCorrect = 0;
    /* Check if the user's guess matches any of the answers to the question */
    this.state.answers.forEach((answer) => {
      if (guess.name.toLowerCase() === answer.name.toLowerCase()) {
        correctGuess = true;
        guess.correct = correctGuess;
        guess.stats = [...answer.stats];
        numCorrect++;
      }
    });
    console.log(guess);
    /* If the guess is correct, increase the correct count */
    if (guess.correct) {
      this.setState((prevState) => ({
        correct: prevState.correct + numCorrect,
        guesses: prevState.guesses.concat(guess),
      }));
    } else {
      this.setState((prevState) => ({
        guesses: prevState.guesses.concat(guess),
        wrong: prevState.wrong + 1,
      }));
    }
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <StartGame getNewQuestion={this.getNewQuestion} />
        <Question question={this.state.question} />
        <Stats
          correct={this.state.correct}
          wrong={this.state.wrong}
          answers={this.state.answers}
          question={this.state.question}
          guesses={this.state.guesses}
        />
        <GuessInput
          answers={this.state.answers}
          handleGuess={this.handleGuesses}
          correct={this.state.correct}
          wrong={this.state.wrong}
        />
        <AnswersTable
          guesses={this.state.guesses}
          correct={this.state.correct}
          answers={this.state.answers}
          wrong={this.state.wrong}
        />
      </div>
    );
  }
}

export default App;
