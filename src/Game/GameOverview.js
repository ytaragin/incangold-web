import React from "react";

const GameOverview = ({ game }) => {
  return (
    <li key={game.gameID}>
        Game ID: {game.gameID} Create Time: {game.statusTime}
    </li>
  );
};

export default GameOverview;