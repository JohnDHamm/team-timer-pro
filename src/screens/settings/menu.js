import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import SecondaryButton from "../../components/secondary_button";
import StoreUtils from "../../utility/store_utils";

export default class Menu extends Component {

  static navigationOptions = {
    title: 'Settings',
    headerBackTitle: 'Settings',
  };

  removeUserSettingsStore() {
    StoreUtils.removeStore('UserSettingsStore');
  }


  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => this.props.navigation.navigate('UserName')}
        >
          <Text style={styles.listText}>User</Text>
        </TouchableOpacity><TouchableOpacity
          style={styles.listButton}
          onPress={() => this.props.navigation.navigate('PaceUnits')}
        >
          <Text style={styles.listText}>Pace units</Text>
        </TouchableOpacity>
        {/*<View> // TEMP for testing empty UserSettingsStore
          <TouchableOpacity
            onPress={() => this.removeUserSettingsStore()}>
            <SecondaryButton
              label={'remove user store'}
              color={sharedStyles.COLOR_RED}/>
          </TouchableOpacity>
        </View>*/}
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
    paddingVertical:15,
    paddingHorizontal: 20
  },
  listText: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    color: sharedStyles.COLOR_PURPLE,
    fontSize: 30,
  }
});
