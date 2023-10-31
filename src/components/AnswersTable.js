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
        <Col xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
          <Table className="answers-table">
            <thead className="answers-table-heading">
              <tr>
                <th>Team</th>
                <th>Name</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody className="answers-table-body">
              {this.props.answers.sort((a,b) => {
                return b.quantity - a.quantity;
              }).map((answer) => {
                if (guessesNames.includes(answer.name)) {
                  return (
                    <tr className="answer-listing">
                      <td className="answer-category bg-secondary bg-opacity-75 info">{answer.teams}</td>
                      <td className="answer-category guess">{answer.name}</td>
                      <td className="answer-category bg-secondary bg-opacity-75 info">{answer.stats[0]}</td>
                    </tr>
                  )
                }
                if (this.props.wrong === 3 && !guessesNames.includes(answer.name)) {
                  return (
                    <tr className="answer-listing-game-over">
                      <td className="answer-category bg-secondary bg-opacity-75 info">{answer.teams}</td>
                      <td className="answer-category guess">{answer.name}</td>
                      <td className="answer-category bg-secondary bg-opacity-75 info">{answer.stats[0]}</td>
                    </tr>
                  )
                }
                return (
                  <tr className="answer-listing">
                    <td className="answer-category bg-secondary bg-opacity-75 info">{answer.teams}</td>
                    <td className="answer-category invisible">{answer.name}</td>
                    <td className="answer-category bg-secondary bg-opacity-75 info">{answer.stats[0]}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </div>
    );
  }
}

export default AnswersTable;
