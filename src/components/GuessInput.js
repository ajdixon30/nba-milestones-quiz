import React from "react";
import "../styles/GuessInput.css";
import players from "../db.json";

// TODO: Add former players (Legends)

let playersInfo = new Set();
let playersNames = [];
players.players.forEach((player) => {
  playersInfo.add(`${player.first_name} ${player.last_name}`);
});
playersNames = [...playersInfo];

class GuessInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.showCell = this.showCell.bind(this);
    this.sendGuess = this.sendGuess.bind(this);
    this.state = {
      input: "",
    };
  }
  handleSearch = (e) => {
    let searchInput = e.target.value;
    this.setState(() => ({
      input: searchInput.toLowerCase(),
    }));
  };
  showCell = (e) => {
    let guessName = e.target.textContent;
    this.sendGuess(guessName);
    this.setState(() => ({
      input: "",
    }));
    document.querySelector("#guess-input").value = "";
  };
  sendGuess = (guessName) => {
    this.props.handleGuess({ name: guessName, correct: false, stats: [] });
  };
  render() {
    let resultsFiltered = playersNames.filter((item) => {
      return item.toLowerCase().includes(this.state.input);
    });
    let results = [];
    if (resultsFiltered.length < 5) {
      results = [];
      for (let i = 0; i < resultsFiltered.length; i++) {
        results.push(resultsFiltered[i]);
      }
    } else {
      results = [];
      for (let i = 0; i < 5; i++) {
        results.push(resultsFiltered[i]);
      }
    }
    let resultsListing = results.map((result, index) => {
      return (
        <li className="results-listing" key={index}>
          {result}
        </li>
      );
    });
    return (
      <div className="guess-container">
        <div>
          <input
            type="text"
            className="guess-input text-center"
            name="guess-input"
            id="guess-input"
            onChange={this.handleSearch}
            disabled={
              this.props.wrong === 3 ||
              this.props.correct === this.props.answers.length
                ? true
                : false
            }
            placeholder={this.props.wrong === 3 && "GAME OVER!"}
          />
        </div>
        <div>
          {this.state.input.length > 0 && (
            <ul className="results-listings" onClick={this.showCell}>
              {resultsListing}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default GuessInput;
