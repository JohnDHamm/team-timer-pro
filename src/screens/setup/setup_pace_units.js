import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import Toggle from '../../components/toggle';
import SecondaryButton from '../../components/secondary_button';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images';
import StoreUtils from "../../utility/store_utils";
import { PACE_UNITS, DISCIPLINES } from '../../utility/constants';

export default class SetupPaceUnits extends Component {

  static navigationOptions = {
    title: 'Setup - pace units',
  };

  constructor(props) {
    super(props);
    this.state = {
      swim: 0,
      bike: 0,
      run: 0
    }
  };

  toggleState(discipline, value) {
    this.setState({[discipline]: value})
  }

  completeSetup() {
    let store = {};
    store.user_name = this.props.navigation.state.params.name;
    let paceUnits ={};
    DISCIPLINES.forEach((disc) => {
      paceUnits[disc] = PACE_UNITS[disc][this.state[disc]];
    });
    store.pace_units = paceUnits;
    StoreUtils.setStore("UserSettingsStore", store)
      .then(() => this.props.navigation.navigate('MainApp'))
  }


  render(){
    return(
      <ScrollView>
        <View style={sharedStyles.LAYOUT_MAIN_STRETCH}>
          <View style={styles.block}>
            <Image
              style={[styles.icon, styles.swimIcon]}
              source={IMAGES.SWIM_ICON_LG}
            />
            <View style={styles.row}>
              <Text style={styles.rowText}>/100</Text>
              <Toggle
                labels={['yards', 'meters']}
                selected={this.state.swim}
                onToggle={(value) => this.toggleState("swim", value)}
              />
            </View>
          </View>
          <View style={styles.block}>
            <Image
              style={[styles.icon, styles.bikeIcon]}
              source={IMAGES.BIKE_ICON_LG}
            />
            <View style={styles.row}>
              <Toggle
                labels={['miles', 'kms']}
                selected={this.state.bike}
                onToggle={(value) => this.toggleState("bike", value)}
              />
              <Text style={styles.rowText}>/hour</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image
              style={[styles.icon, styles.runIcon]}
              source={IMAGES.RUN_ICON_LG}
            />
            <View style={styles.row}>
              <Text style={styles.rowText}>/</Text>
              <Toggle
                labels={['mile', 'km']}
                selected={this.state.run}
                onToggle={(value) => this.toggleState("run", value)}
              />
            </View>
          </View>
          <View style={styles.block}>
            <TouchableOpacity
              onPress={() => this.completeSetup()}>
              <SecondaryButton
                label={'complete setup'}
                color={sharedStyles.COLOR_PURPLE}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  icon: {
    width: 100,
    tintColor: sharedStyles.COLOR_GREEN
  },
  swimIcon: {
    height: 100 / IMAGES.SWIM_ICON_ASPECT,
  },
  bikeIcon: {
    height: 100 / IMAGES.BIKE_ICON_ASPECT,
  },
  runIcon: {
    height: 100 / IMAGES.RUN_ICON_ASPECT,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center'
  },
  rowText: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 30,
    color: sharedStyles.COLOR_PURPLE,
    paddingHorizontal: 10
  }
});
