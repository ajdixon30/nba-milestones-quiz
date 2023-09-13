import React from "react";
import { Col, Table } from "react-bootstrap";
import "../styles/AnswersTable.css";

class AnswersTable extends React.Component {
  render() {
    let guessesNames = this.props.guesses.map((guess) => {
      return guess.name;
    });
    let usersAnswersListings = this.props.guesses.map((item) => {
      if (item.correct) {
        return (
          <tr
            className={
              this.props.correct === this.props.answers.length
                ? "answer-listing-congrats"
                : "answer-listing"
            }
          >
            <td className="answer-category">{item.name}</td>
            <td className="answer-category">
              {item.stats.map((instance) => (
                <p>{instance}</p>
              ))}
            </td>
          </tr>
        );
      }
    });
    let finalAnswersListings = this.props.answers.map((item) => {
      if (guessesNames.includes(item.name) === false) {
        return (
          <tr className="answer-listing-game-over">
            <td className="answer-category">{item.name}</td>
            <td className="answer-category">
              {item.stats.map((instance) => (
                <p>{instance}</p>
              ))}
            </td>
          </tr>
        );
      }
    });
    return (
      <div>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          {this.props.correct > 0 && (
            <Table className="answers-table">
              <thead className="answers-table-heading">
                <tr>
                  <th>Name</th>
                  <th>Stats</th>
                </tr>
              </thead>
              <tbody className="answers-table-body">
                {usersAnswersListings}
                {this.props.wrong === 3 && finalAnswersListings}
              </tbody>
            </Table>
          )}
        </Col>
      </div>
    );
  }
}

export default AnswersTable;
