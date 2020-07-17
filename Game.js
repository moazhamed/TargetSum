import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber.js';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    intialSecondes: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  state = {
    selectedIds: [],
    remainingSeconds: this.props.intialSecondes,
  };

  gameStatus = 'PLAYING';

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds == 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);
  // TODO : shuffle the random numbers
  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => {
      return {
        selectedIds: [...prevState.selectedIds.concat(numberIndex)],
      };
    });
  };
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentDidUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds != this.state.selectedIds ||
      nextState.remainingSeconds == 0
    ) {
      this.gameStatus = this.calcGameStatus();
      if (this.gameStatus != 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  calcGameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    console.log(sumSelected);
    if (this.state.remainingSeconds == 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected == this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.calcGameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus != 'PLAYING'
              }
              onClick={this.selectNumber}
              id={index}
            />
          ))}
        </View>
        {this.calcGameStatus() != 'PLAYING' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain}></Button>
        )}
        <Text>
          {'Remaining secondes : ' +
            this.state.remainingSeconds +
            ` ${this.calcGameStatus()}`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 20,
  },
  target: {
    margin: 50,
    fontSize: 40,
    borderRadius: 8,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
