import React, { Component } from 'react';
import {View, Text, Image, Picker, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import sharedStyles from "../styles/shared_styles";
import SecondaryButton from "./secondary_button";
import IMAGES from "../../assets/images";
import _ from 'lodash';

export default class TimePaceModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: '0',
      seconds: '00'
    }
  };
  
  componentDidMount() {
  }

  createMinutesArray() {
    let minutesArray = [];
    for (let i = 0; i < 60; i++ ) {
      minutesArray.push(i.toString())
    }
    return minutesArray;
  }

  createSecondsArray() {
    let secondsArray = [];
    for (let i = 0; i < 60; i++) {
      let newValue = i.toString();
      newValue = (newValue.length < 2) ? `0${newValue}` : newValue;
      secondsArray.push(newValue)
    }
    return secondsArray;
  }

  renderMinuteItems() {
    const items = this.createMinutesArray();
    return items.map(item => {
      return(
        <Picker.Item key={item} label={item} value={item} />
      )
    })
  }

  renderSecondItems() {
    const items = this.createSecondsArray();
    return items.map(item => {
      return(
        <Picker.Item key={item} label={item} value={item} />
      )
    })
  }


  savePace() {
    console.log("save pace", this.state.minutes, ':', this.state.seconds);
    this.props.setPace(this.state.minutes, this.state.seconds);
    this.props.closeModal()
  }

  render() {
    return(
      <View style={styles.modal}>
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.minutes}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(value) => this.setState({minutes: value})}
            >
              {this.renderMinuteItems()}
            </Picker>
            <View style={styles.colonBlock}>
              <Text style={styles.colon}>:</Text>
            </View>
            <Picker
              selectedValue={this.state.seconds}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(value) => this.setState({seconds: value})}
            >
              {this.renderSecondItems()}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.savePace()}>
              <SecondaryButton
                label={'save pace'}
                color={sharedStyles.COLOR_PURPLE}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_MODAL_BG,
    paddingTop: 140
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
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginVertical: 20
  },
  picker: {
    width: 75,
  },
  pickerItem: {
    fontSize: 40,
    color: sharedStyles.COLOR_PURPLE,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
  },
  colonBlock: {
    position: 'absolute',
    top: 74,
    left: 68
  },
  colon: {
    fontSize: 40,
    color: sharedStyles.COLOR_LIGHT_GRAY,
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
  },
  buttonContainer: {
    alignItems: 'center',
  }
});
