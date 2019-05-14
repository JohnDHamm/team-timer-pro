import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import sharedStyles from '../../styles/shared_styles';
import SecondaryButton from '../../components/secondary_button'
import IMAGES from '@assets/images'

export default class SetupHome extends Component {

  componentDidMount() {
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={IMAGES.TT_PRO_LOGO_TITLE_LG}
          style={styles.logo}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.welcomeText}> </Text>
          <Text style={styles.welcomeText}>Let’s get started by setting up some items needed to make the most of Team Timer Pro…</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SetupUserName')}>
            <SecondaryButton
              label={'start setup'}
              color={sharedStyles.COLOR_GREEN}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const { DEVICE_WIDTH } = sharedStyles;
const logoWidth = DEVICE_WIDTH * 0.33;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
    padding: 20
  },
  logo: {
    width: logoWidth,
    height: logoWidth / IMAGES.TT_PRO_LOGO_TITLE_ASPECT
  },
  welcomeText: {
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    color: sharedStyles.COLOR_GREEN,
    fontSize: 25,
    textAlign: 'center'
  }
});
