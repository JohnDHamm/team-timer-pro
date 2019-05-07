import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'

// import NextButton from '../../components/next_button';
// import {Haptic} from 'expo';

export default class Menu extends Component {

  static navigationOptions = {
    title: 'Settings',
    headerBackTitle: 'Menu',
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // };


  render(){

    return(
      <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
        <Text>Settings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});
