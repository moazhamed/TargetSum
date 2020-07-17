import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

class RandomNumber extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handlePress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onLongPress={this.handlePress}>
        <Text style={[styles.item, this.props.isDisabled && styles.disabled]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    backgroundColor: '#aaa',
    textAlign: 'center',
    fontSize: 40,
    borderRadius: 5,
  },
  disabled: {
    opacity: 0.3,
  },
});

export default RandomNumber;
