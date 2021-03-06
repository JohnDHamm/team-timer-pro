import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles'
import SecondaryButton from '../../components/secondary_button'
import NextButton from "../../components/next_button";
import {ERR_MSG} from '../../utility/constants';

export default class AthleteEntry extends Component {

  static navigationOptions = {
    title: 'Add an athlete',
    headerBackTitle: 'Cancel',
  };

  constructor(props) {
    super(props);
    this.state = {
      teamStore: {},
      newName: "",
      showSaveBtn: false,
      showErrMsg: false,
      errMsg: ERR_MSG.DUPE_NAME,
    }
  };

  componentDidMount() {
    const { teamStore } = this.props.navigation.state.params;
    this.setState({teamStore});
  }

  onChangeText(newName) {
    if (newName) {
      if (this.checkDuplicateAthlete(newName)) {
        this.setState({showErrMsg: true, showSaveBtn: false})
      } else {
        this.setState({showSaveBtn: true, showErrMsg: false, newName})
      }
    } else {
      this.setState({showSaveBtn: false, showErrMsg: false})
    }
  }

  saveAthlete() {
    let updatedTeam = this.state.teamStore;
    const newAthlete = {
      name: this.state.newName,
      swim_pace: 0,
      bike_pace: 0,
      run_pace: 0
    };
    updatedTeam[this.state.newName] = newAthlete;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    })
    StoreUtils.setStore('TeamStore', updatedTeam)
      .then(() => this.props.navigation.dispatch(resetAction));
  }

  checkDuplicateAthlete(newName) {
    const teamNames = Object.keys(this.state.teamStore);
    const match = teamNames.filter(name => name === newName);
    return (match.length > 0)
  }


  render(){
    return(
      <KeyboardAvoidingView style={sharedStyles.LAYOUT_MAIN_CENTER} behavior={'padding'}>
        <View style={ styles.topContainer}>
          <View style={ styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(newName) => this.onChangeText(newName)}
              selectionColor={sharedStyles.COLOR_PURPLE}
              maxLength={10}
              autoFocus={true}
              returnKeyType='done'
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {this.state.showErrMsg &&
            <Text style={styles.errMsg}>{this.state.errMsg}</Text>
          }
          {this.state.showSaveBtn &&
            <View>
              <View style={styles.saveBtnContainer}>
                <TouchableOpacity
                  onPress={() => this.saveAthlete()}>
                  <SecondaryButton
                    label={'save athlete'}
                    color={sharedStyles.COLOR_PURPLE}/>
                </TouchableOpacity>
              </View>
              <View style={styles.nextContainer}>
                <NextButton
                  label={'add pace info'}
                  disabled={false}
                  onPress={() => this.props.navigation.navigate(`AthletePaceEntry`, { ...this.props.navigation.state.params, name: this.state.newName })}/>
                <Text style={styles.optionalText}>[optional]</Text>
              </View>
            </View>
          }
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
	topContainer: {
		flex: 0.4,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textInput: {
    width: 260,
	  height: 80,
    fontSize: 50,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  bottomContainer: {
	  flex: 0.6,
    paddingTop: 20,
    alignSelf: 'stretch',
  },
  saveBtnContainer: {
	  justifyContent: 'center',
    alignItems: 'center'
  },
  nextContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    paddingTop: 30
  },
  optionalText: {
	  textAlign: 'center',
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 17,
    color: sharedStyles.COLOR_GREEN,
    paddingTop: 5
  },
  errMsg: {
	  textAlign: 'center',
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 20,
	  color: sharedStyles.COLOR_RED,
    paddingBottom: 15,
  },
});
