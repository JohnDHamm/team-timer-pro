import React, { Component } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles'
import SecondaryButton from '../../components/secondary_button'

export default class UserName extends Component {

  static navigationOptions = {
    title: 'Edit user name',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      showSaveButton: false,
    }
  };

  componentDidMount() {
    StoreUtils.getStore('UserSettingsStore')
      .then( res => {
        if (res !== null) {
          this.setState({ userStore: res, origName: res.user_name })
        }
      })
  }

  onChangeText(newName) {
    if (newName && newName !== this.state.origName) {
      this.setState({showSaveButton: true, name: newName})
    } else {
      this.setState({showSaveButton: false})
    }
  }

  saveName() {
    let store = Object.assign({}, this.state.userStore);
    store.user_name = this.state.name;
    StoreUtils.setStore('UserSettingsStore', store)
      .then(() => this.props.navigation.goBack())
  }


  render(){
    return(
      <KeyboardAvoidingView style={sharedStyles.LAYOUT_MAIN_CENTER} behavior={'padding'}>
        <View style={ styles.topContainer}>
          <View style={ styles.inputContainer}>
            <TextInput
              defaultValue={this.state.origName}
              style={styles.textInput}
              onChangeText={(newName) => this.onChangeText(newName)}
              selectionColor={sharedStyles.COLOR_PURPLE}
              maxLength={10}
              autoFocus={true}
              returnKeyType='done'
            />
          </View>
        </View>
        <View style={ styles.bottomContainer}>
          {this.state.showSaveButton &&
          <View>
            <TouchableOpacity
              onPress={() => this.saveName()}>
              <SecondaryButton
                label={'save change'}
                color={sharedStyles.COLOR_PURPLE}/>
            </TouchableOpacity>
          </View>
          }
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
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
  bottomContainer: {
    flex: 0.5,
    paddingTop: 20,
  },
});
