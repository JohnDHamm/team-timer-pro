import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'
import StoreUtils from "../../utility/store_utils";

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'dosis-regular': require('../../../assets/fonts/Dosis-Regular.ttf'),
      'dosis-medium': require('../../../assets/fonts/Dosis-Medium.ttf'),
      'dosis-light': require('../../../assets/fonts/Dosis-Light.ttf'),
      'dosis-semiBold': require('../../../assets/fonts/Dosis-SemiBold.ttf'),
    });
    StoreUtils.getStore('UserSettingsStore')
      .then(res => {
        if (res !== null) {
          this.setState({ userName: res.user_name }, () => {
            setTimeout(() => this.props.navigation.navigate('MainApp'), 1000);
          });
        } else {
          setTimeout(() => this.props.navigation.navigate('SetupHome'), 1000);
        }
      });
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={IMAGES.TT_PRO_LOGO_TITLE_LG}
          style={styles.logo}
        />
        {this.state.userName ?
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.welcome}>Coach {this.state.userName}!</Text>
          </View>
          :
          null
        }
      </View>
    )
  }
}

const { DEVICE_WIDTH } = sharedStyles;
const logoWidth = DEVICE_WIDTH * 0.33;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  logo: {
	  width: logoWidth,
    height: logoWidth / IMAGES.TT_PRO_LOGO_TITLE_ASPECT
  },
  welcomeBlock: {
	  paddingTop: 30
  },
  welcome: {
    fontWeight: '200',
    color: sharedStyles.COLOR_GREEN,
    fontSize: 25,
    textAlign: 'center'
  }
});
