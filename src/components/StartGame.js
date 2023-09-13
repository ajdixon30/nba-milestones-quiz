import React from "react";
import "../styles/StartGame.css";
import { Button } from "react-bootstrap";

const StartGame = (props) => {
  return (
    <div className="newGame-container">
      <Button className="newGame-btn" onClick={props.getNewQuestion}>
        New Game
      </Button>
    </div>
  );
};

export default StartGame;
