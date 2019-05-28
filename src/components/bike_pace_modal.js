import React, { Component } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import sharedStyles from "../styles/shared_styles";
import SecondaryButton from "./secondary_button";
import IMAGES from "../../assets/images";

export default class BikePaceModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSaveBtn: true,
      bikePace: 0
    }
  };

  onChangeText(value) {
    let valueFloat = parseFloat(value);
    if (!valueFloat) {
      this.setState({ showSaveBtn: false });
    } else {
      this.setState({ showSaveBtn: true, bikePace: valueFloat });
    }
  }

  savePace() {
    this.props.setBikePace(this.state.bikePace);
    this.props.closeModal()
  }

  render() {
    return(
      <View style={styles.modal}>
        <View style={styles.top}>
          <View style={styles.main}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={() => this.props.closeModal()}>
                <Image
                  style={styles.closeIcon}
                  source={IMAGES.MODAL_CLOSE_ICON_SM}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.onChangeText(value)}
                keyboardType='decimal-pad'
                selectionColor={sharedStyles.COLOR_PURPLE}
                maxLength={4}
                autoFocus={true}
              />
            </View>
            {this.state.showSaveBtn ?
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.savePace()}>
                  <SecondaryButton
                    label={'save pace'}
                    color={sharedStyles.COLOR_PURPLE}/>
                </TouchableOpacity>
              </View>
              :
              <Text style={styles.errMsg}>please enter a valid number</Text>
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_MODAL_BG,
    paddingTop: 140
  },
  top: {
    flex: .5,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_WHITE,
    width: sharedStyles.DEVICE_WIDTH * 0.8,
    borderRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  closeContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    width: 25,
    height: 25 / IMAGES.MODAL_CLOSE_ICON_SM_ASPECT
  },
  inputContainer: {
    borderColor: sharedStyles.COLOR_PURPLE,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20
  },
  textInput: {
    width: 120,
    height: 80,
    fontSize: 50,
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  buttonContainer: {
   alignItems: 'center',
  },
  errMsg: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_RED,
    paddingVertical: 6
  }
});
