import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import sharedStyles from '../styles/shared_styles';

export default class Toggle extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({selected: this.props.selected})
    }
  }

  onPress(value) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    this.setState({selected: value});
    this.props.onToggle(value);
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.block, styles.leftBlock, this.state.selected === 0 ? styles.selected : styles.unselected]}
          onPress={() => this.onPress(0)}
        >
          <Text style={[styles.label, this.state.selected === 0 ? styles.selectedLabel : styles.unselectedLabel]}>
            {this.props.labels[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.block, styles.rightBlock, this.state.selected === 1 ? styles.selected : styles.unselected]}
          onPress={() => this.onPress(1)}
        >
          <Text style={[styles.label, this.state.selected === 1 ? styles.selectedLabel : styles.unselectedLabel]}>
            {this.props.labels[1]}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    borderColor: sharedStyles.COLOR_GREEN,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 7,
    paddingHorizontal: 13
  },
  leftBlock: {
    borderBottomLeftRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    borderTopLeftRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
  },
  rightBlock: {
    borderBottomRightRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    borderTopRightRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
  },
  selected: {
    backgroundColor: sharedStyles.COLOR_GREEN
  },
  unselected: {
    backgroundColor: 'transparent'
  },
  label: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 25
  },
  selectedLabel: {
    color: sharedStyles.COLOR_PURPLE
  },
  unselectedLabel: {
    color: sharedStyles.COLOR_LIGHT_GRAY
  }
});
