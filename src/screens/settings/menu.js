import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';

export default class Menu extends Component {

  static navigationOptions = {
    title: 'Settings',
    headerBackTitle: 'Settings',
  };

  render(){

    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => this.props.navigation.navigate('PaceUnits')}
        >
          <Text style={styles.listText}>Pace units</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  listButton: {
    borderBottomColor: sharedStyles.COLOR_LIGHT_GRAY,
    borderBottomWidth: 1,
    paddingVertical:10,
    paddingHorizontal: 20
  },
  listText: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    color: sharedStyles.COLOR_PURPLE,
    fontSize: 30,
  }
});
