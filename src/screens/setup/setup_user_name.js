import React, { Component } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'

import sharedStyles from '../../styles/shared_styles'
import NextButton from "../../components/next_button";

export default class SetupUserName extends Component {

  static navigationOptions = {
    title: 'Setup - user name',
    headerBackTitle: 'Name',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      disableNextButton: true
    }
  };

  onChangeText(name) {
    if (name) {
      this.setState({disableNextButton: false, name})
    } else {
      this.setState({disableNextButton: true})
    }
  }


  render(){
    return(
      <KeyboardAvoidingView style={sharedStyles.LAYOUT_MAIN_CENTER} behavior={'padding'}>
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
        <View style={styles.nextContainer}>
          <NextButton
            label={'pace units'}
            disabled={this.state.disableNextButton}
            onPress={() => this.props.navigation.navigate(`SetupPaceUnits`, { name: this.state.name })}/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 40,
  },
  textInput: {
    width: 260,
    height: 80,
    fontSize: 50,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  nextContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  }
});
