import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Modal} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import StoreUtils from '../../utility/store_utils';
import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images';
import SecondaryButton from '../../components/secondary_button';
import TimePaceModal from "../../components/time_pace_modal";
import Utils from "../../utility/utils";
import BikePaceModal from "../../components/bike_pace_modal";
import {ERR_MSG} from '../../utility/constants';

export default class EditAthlete extends Component {

  static navigationOptions = {
    title: 'Edit athlete',
  };

  constructor(props) {
    super(props);
    this.state = {
      athlete: {},
      originalName: "",
      teamStore: {},
      newName: "",
      showNameInput: false,
      showSaveBtn: true,
      showDeleteBtn: true,
      showErrMsg: false,
      errMsg: ERR_MSG.DUPE_NAME,
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
    const { teamStore, athlete } = this.props.navigation.state.params;
    this.setState({teamStore, athlete, originalName: athlete.name, newName: athlete.name});
    if (athlete.swim_pace !== 0) {
      this.setState({swimPace: athlete.swim_pace});
      const swimDisplay = Utils.createDisplayTime(athlete.swim_pace);
      this.setState({swimPaceDisplay: swimDisplay.main})
    }
    if (athlete.bike_pace !== 0 ) {
      this.setState({bikePace: athlete.bike_pace});
      this.setState({bikePaceDisplay: athlete.bike_pace})
    }
    if (athlete.run_pace !== 0) {
      this.setState({runPace: athlete.run_pace});
      const runDisplay = Utils.createDisplayTime(athlete.run_pace);
      this.setState({runPaceDisplay: runDisplay.main})
    }
    StoreUtils.getStore('UserSettingsStore')
      .then(res => {
        if (res !== null) {
          this.setState({paceStore: res.pace_units})
        }
      })
  }

  renderBikeLabel() {
    if (!this.state.paceStore) {
      return ""
    } else {
      return (this.state.paceStore.bike === 'mi') ? 'mph' : 'km/h';
    }
  }

  onChangeText(newName) {
    this.setState({newName}, () => this.checkName());
  }

  checkName() {
    if (this.state.newName) { //not empty
      if (this.state.newName === this.state.originalName) { //name not changed
        this.setState({showDeleteBtn: true, showSaveBtn: true, showErrMsg: false})
      } else { //different name from original
        if (this.checkDuplicateAthlete(this.state.newName)) { //name changed but already exists
          this.setState({showDeleteBtn: false, showSaveBtn: false, errMsg: ERR_MSG.DUPE_NAME, showErrMsg: true})
        } else { //new unique name
          this.setState({showSaveBtn: true, showDeleteBtn: false, showErrMsg: false})
        }
      }
    } else { //empty
      this.setState({showSaveBtn: false, showDeleteBtn: false, errMsg: ERR_MSG.EMPTY_NAME, showErrMsg: true})
    }
  }

  onBlurCheck() {
    this.checkName();
    if (this.state.newName !== '') {
      this.setState({showNameInput: false})
    }
  }

  saveAthlete() {
    let updatedTeamStore = this.state.teamStore;
    delete updatedTeamStore[this.state.originalName];
    const newAthlete = {
      name: this.state.newName,
      swim_pace: this.state.swimPace,
      bike_pace: this.state.bikePace,
      run_pace: this.state.runPace
    };
    updatedTeamStore[this.state.newName] = newAthlete;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TeamList'})]
    });
    StoreUtils.setStore('TeamStore', updatedTeamStore)
      .then(() => this.props.navigation.dispatch(resetAction));
  }

  checkDuplicateAthlete(newName) {
    const teamNames = Object.keys(this.state.teamStore);
    const match = teamNames.filter(name => name === newName);
    return (match.length > 0)
  }

  deleteAthlete(name) {
    let updatedTeamStore = this.state.teamStore;
    delete updatedTeamStore[name];
    StoreUtils.setStore('TeamStore', updatedTeamStore)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TeamList' })],
        });
        this.props.navigation.dispatch(resetAction);
      })
  }

  setSwimPace(minutes, seconds) {
    this.setState({ swimPaceDisplay: `${minutes}:${seconds}` });
    const swimPace =  Utils.convertMMSStoMS(minutes, seconds);
    this.setState({ swimPace})
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


  render(){
    return(
      <ScrollView>
        <View style={sharedStyles.LAYOUT_MAIN_CENTER}>
          <View style={ styles.container}>
            {!this.state.showNameInput ?
              <TouchableOpacity
                onPress={() => this.setState({showNameInput: true})}>
                <Text style={styles.name}>{this.state.newName}</Text>
              </TouchableOpacity>
            :
              <View>
                <View style={ styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(newName) => this.onChangeText(newName)}
                    selectionColor={sharedStyles.COLOR_PURPLE}
                    maxLength={10}
                    autoFocus={true}
                    returnKeyType='done'
                    defaultValue={this.state.newName}
                    onBlur={() => this.onBlurCheck()}
                  />
                </View>
              </View>
            }
            {this.state.showErrMsg &&
              <Text style={styles.errMsg}>{this.state.errMsg}</Text>
            }

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

            {this.state.showSaveBtn &&
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => this.saveAthlete()}>
                <SecondaryButton
                  label={'save changes'}
                  color={sharedStyles.COLOR_PURPLE}/>
              </TouchableOpacity>
            }
            {this.state.showDeleteBtn &&
              <TouchableOpacity
                onPress={() => this.deleteAthlete(this.state.originalName)}>
                <SecondaryButton
                  label={'delete athlete'}
                  color={sharedStyles.COLOR_RED}/>
              </TouchableOpacity>
            }
          </View>

          <Modal
            visible={this.state.showSwimPaceModal}
            animationType='slide'
            transparent={true}
            onRequestClose={() => this.setState({ showSwimPaceModal: false })}
          >
            <TimePaceModal
              defaultTime={{minutes: this.state.swimPaceDisplay.split(':')[0], seconds: this.state.swimPaceDisplay.split(':')[1]}}
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
              defaultSpeed={this.state.bikePace}
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
              defaultTime={{minutes: this.state.runPaceDisplay.split(':')[0], seconds: this.state.runPaceDisplay.split(':')[1]}}
              closeModal={() => this.setState({ showRunPaceModal: false })}
              setPace={(minutes, seconds) => this.setRunPace(minutes, seconds)}
            />
          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const iconWidth = 70;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 45,
    color: sharedStyles.COLOR_GREEN
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
  errMsg: {
    textAlign: 'center',
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_RED,
    paddingBottom: 15,
    paddingTop: 10,
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
    justifyContent: 'space-between',
  },
  saveBtn: {
    marginBottom: 30
  }
});
