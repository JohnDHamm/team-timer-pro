import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';
import Utils from '../../utility/utils';
import sharedStyles from '../../styles/shared_styles'
import IMAGES from '@assets/images';
import SecondaryButton from '../../components/secondary_button';
import BikePaceModal from '../../components/bike_pace_modal';
import TimePaceModal from '../../components/time_pace_modal';

export default class AthletePaceEntry extends Component {

  static navigationOptions = {
    title: 'Add pace info',
  };

  constructor(props) {
    super(props);
    this.state = {
      teamStore: {},
      // showSaveBtn: false,
      showErrMsg: false,
      errMsg: "Please set the pace units for your team in settings!",
      swimPaceDisplay: "-:--",
      bikePaceDisplay: '--.-',
      runPaceDisplay: '--:--',
      swimPace: 0,
      bikePace: 0,
      runPace: 0,
      showSwimPaceModal: false,
      showBikePaceModal: false,
      showRunPaceModal: false,
    }
  };

  componentDidMount() {
    const { name, teamStore } = this.props.navigation.state.params;
    // console.log("existing teamStore", teamStore);
    // console.log("new athlete name", name);
    this.setState({name, teamStore});
    StoreUtils.getStore('UserSettingsStore')
      .then(res => {
        if (res !== null) {
          this.setState({paceStore: res.pace_units})
        } else {
          this.setState({ showErrMsg: true })
        }
      })
  }

  renderBikeLabel() {
    if (!this.state.paceStore) {
      return ""
    } else {
      if (this.state.paceStore.bike === 'mi') {
        return 'mph'
      } else {
        return 'km/h'
      }
    }
  }

  setSwimPace(minutes, seconds) {
    this.setState({ swimPaceDisplay: `${minutes}:${seconds}` });
    const swimPace =  Utils.convertMMSStoMS(minutes, seconds);
    this.setState({ swimPace })
  }

  setBikePace(pace) {
    const bikePaceDisplay = pace.toFixed(1);
    this.setState({ bikePace: pace, bikePaceDisplay })
  }

  setRunPace(minutes, seconds) {
    this.setState({ runPaceDisplay: `${minutes}:${seconds}` });
    const runPace =  Utils.convertMMSStoMS(minutes, seconds);
    this.setState({ runPace })
  }

  saveAthlete() {
    let updatedTeam = this.state.teamStore;
    const newAthlete = {
      name: this.state.name,
      swim_pace: this.state.swimPace,
      bike_pace: this.state.bikePace,
      run_pace: this.state.runPace
    };
    updatedTeam[this.state.name] = newAthlete;
    // console.log("updatedTeam", updatedTeam);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    });
    StoreUtils.setStore('TeamStore', updatedTeam)
      .then(() => this.props.navigation.dispatch(resetAction));
  }


  render(){
    return(
      <View style={sharedStyles.LAYOUT_MAIN_CENTER}>
        {this.state.showErrMsg ?
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.errIcon}
              source={IMAGES.EMPTY_PACE_SETTINGS_MED}
              />
            <Text style={styles.errMsg}>{this.state.errMsg}</Text>
          </View>
          :
          <View>
            <View style={ styles.topContainer}>
              <Text style={styles.name}>{this.state.name}</Text>
              <View style={styles.block}>
                <View style={styles.row}>
                  <Image
                    style={[styles.icon, styles.swimIcon]}
                    source={IMAGES.SWIM_ICON_LG}
                    />
                  <TouchableOpacity
                    onPress={() => this.setState({showSwimPaceModal: true})}
                  >
                    <Text style={styles.paceText}>
                      {this.state.swimPaceDisplay}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>
                  /100{this.state.paceStore ? this.state.paceStore.swim : null}
                </Text>
              </View>
              <View style={styles.block}>
                <View style={styles.row}>
                  <Image
                    style={[styles.icon, styles.bikeIcon]}
                    source={IMAGES.BIKE_ICON_LG}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showBikePaceModal: true})}
                  >
                    <Text style={styles.paceText}>
                      {this.state.bikePaceDisplay}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>
                  {this.renderBikeLabel()}
                </Text>
              </View>
              <View style={styles.block}>
                <View style={styles.row}>
                  <Image
                    style={[styles.icon, styles.runIcon]}
                    source={IMAGES.RUN_ICON_LG}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showRunPaceModal: true})}
                  >
                    <Text style={styles.paceText}>
                      {this.state.runPaceDisplay}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>
                  /{this.state.paceStore ? this.state.paceStore.run : null}
                </Text>
              </View>
            </View>
            <View style={ styles.bottomContainer}>
                <TouchableOpacity
                  onPress={() => this.saveAthlete()}
                >
                  <SecondaryButton
                    label={'save athlete'}
                    color={sharedStyles.COLOR_PURPLE}
                  />
                </TouchableOpacity>
            </View>
          </View>
        }

        <Modal
          visible={this.state.showSwimPaceModal}
          animationType='slide'
          transparent={true}
          onRequestClose={() => this.setState({ showSwimPaceModal: false })}
        >
          <TimePaceModal
            closeModal={() => this.setState({ showSwimPaceModal: false })}
            setPace={(minutes, seconds) => this.setSwimPace(minutes, seconds)}
          />
        </Modal>
        <Modal
          visible={this.state.showBikePaceModal}
          animationType='slide'
          transparent={true}
          onRequestClose={() => this.setState({ showBikePaceModal: false })}
        >
          <BikePaceModal
            closeModal={() => this.setState({ showBikePaceModal: false })}
            setBikePace={(pace) => this.setBikePace(pace)}
          />
        </Modal>
        <Modal
          visible={this.state.showRunPaceModal}
          animationType='slide'
          transparent={true}
          onRequestClose={() => this.setState({ showRunPaceModal: false })}
        >
          <TimePaceModal
            closeModal={() => this.setState({ showRunPaceModal: false })}
            setPace={(minutes, seconds) => this.setRunPace(minutes, seconds)}
          />
        </Modal>

      </View>
    )
  }
}


const iconWidth = 70;

const styles = StyleSheet.create({
  errIcon: {
    width: 85,
    height: 85 / IMAGES.EMPTY_PACE_SETTINGS_ASPECT
  },
  errMsg: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_RED,
    paddingTop: 15,
    textAlign: 'center'
  },
  topContainer: {
    flex: 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 45,
    color: sharedStyles.COLOR_GREEN
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: iconWidth,
    tintColor: sharedStyles.COLOR_GREEN,
    marginRight: 20
  },
  swimIcon: {
    height: iconWidth / IMAGES.SWIM_ICON_ASPECT,
  },
  bikeIcon: {
    height: iconWidth / IMAGES.BIKE_ICON_ASPECT,
  },
  runIcon: {
    height: iconWidth / IMAGES.RUN_ICON_ASPECT,
  },
  paceText: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 60,
    color: sharedStyles.COLOR_PURPLE
  },
  label: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 30,
    color: sharedStyles.COLOR_PURPLE
  },
  bottomContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
