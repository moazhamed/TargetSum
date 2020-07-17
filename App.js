import React from 'react';
import Game from './Game.js';

// TODO add two more features 1-make game harder by increasing numbers and decreasing secondes
// TODO 2-keep track of user score

class App extends React.Component {
  state = {
    gameId: 1,
  };

  resetGame = () => {
    this.setState(prevState => {
      return {gameId: prevState.gameId + 1};
    });
  };

  render() {
    return (
      <Game
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomNumberCount={6}
        intialSecondes={10}
      />
    );
  }
}

export default App;
