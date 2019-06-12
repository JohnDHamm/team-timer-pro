import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'

import NextButton from '../../components/next_button';
import * as Haptics from 'expo-haptics';

export default class SelectDiscipline extends Component {

  static navigationOptions = {
    title: 'What type of workout?',
    headerBackTitle: 'Type',
  };

  constructor(props) {
    super(props);
    this.state = {
      discipline: '',
      disableNextButton: true
    }
  };

  selectDiscipline(discipline) {
    discipline !== this.state.discipline ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) : null;
    this.setState({discipline, disableNextButton: false});
  }

  render(){

    return(
      <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
        <View style={{flex: 1}}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.selectDiscipline('swim')}
            >
              <Image
                style={[styles.icon, styles.swimIcon, this.state.discipline === 'swim' ? styles.selected : styles.unselected]}
                source={IMAGES.SWIM_ICON_LG}
                />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.selectDiscipline('bike')}
            >
              <Image
                style={[styles.icon, styles.bikeIcon, this.state.discipline === 'bike' ? styles.selected : styles.unselected]}
                source={IMAGES.BIKE_ICON_LG}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.selectDiscipline('run')}
            >
              <Image
                style={[styles.icon, styles.runIcon, this.state.discipline === 'run' ? styles.selected : styles.unselected]}
                source={IMAGES.RUN_ICON_LG}
              />
            </TouchableOpacity>
          </View>
          <View style={[{flex: 0.1}, sharedStyles.LAYOUT_NEXT_BUTTON_CONTAINER]}>
            <NextButton
              label={'lap count'}
              disabled={this.state.disableNextButton}
              onPress={() => this.props.navigation.navigate(`LapCount`, { discipline: this.state.discipline })}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30
  },
  button: {

  },
  icon: {
    width: 100,
  },
  swimIcon: {
    height: 100 / IMAGES.SWIM_ICON_ASPECT
  },
  bikeIcon: {
    height: 100 / IMAGES.BIKE_ICON_ASPECT
  },
  runIcon: {
    height: 100 / IMAGES.RUN_ICON_ASPECT
  },
  selected: {
    tintColor: sharedStyles.COLOR_GREEN
  },
  unselected: {
    tintColor: sharedStyles.COLOR_LIGHT_GRAY
  }
});
