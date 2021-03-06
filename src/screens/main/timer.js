import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActionSheetIOS, Animated} from 'react-native';
import * as Haptics from 'expo-haptics';
import PieChart from 'react-native-pie-chart';

import StoreUtils from '../../utility/store_utils';
import Utils from '../../utility/utils';

import _ from 'lodash';

import IMAGES from '@assets/images';
import sharedStyles from '../../styles/shared_styles';
import DisciplineIcon from "../../components/discipline_icon";

const athleteButtonHeight = 102;
const spaceBetweenButtons = 20;
const buttonSpacing = athleteButtonHeight + spaceBetweenButtons;
const buttonAnimDuration = 250;

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workoutData: {},
      paceUnits: {},
      paceLabel: '',
      description: "",
      timerOn: false,
      startTime: 0,
      time: 0,
      interval: null,
      mainReadout: {
        main: "0:00",
        decimal: "0",
      },
      lapsCompleted: 0,
      athletesArray: [],
      totalAthletes: 0,
      btnTopPositions: [],
      steps: [],
      currentAthleteOrder: []
    }
  }

  componentDidMount() {
    const { discipline, lapCount, lapDistance, lapMetric, selectedAthletes } = this.props.navigation.state.params;
    this.setState({workoutData: { discipline, lapCount, lapDistance, lapMetric }},
      () => this.sortAthletes(selectedAthletes));
    StoreUtils.getStore('UserSettingsStore')
      .then(res => {
        const paceUnits = res.pace_units;
        const paceLabel = Utils.getPaceLabel(discipline, paceUnits);
        this.setState({paceUnits, paceLabel})
      })
  }

  sortAthletes(selectedAthletes) {
    StoreUtils.getStore('TeamStore')
      .then(teamStore => {
        let discPace = `${this.state.workoutData.discipline}_pace`;
        let workoutTeam = [];
        _.forEach(teamStore, (value, key) => {
          if (selectedAthletes.includes(key)) {
            workoutTeam.push({ name: value.name, pace: value[discPace]})
          }
        });
        const pacedAthletes = workoutTeam.filter(ath => ath.pace !== 0);
        if (this.state.workoutData.discipline === 'bike') {
          pacedAthletes.sort((a,b) => b.pace > a.pace)
        } else {
          pacedAthletes.sort((a,b) => a.pace > b.pace)
        }
        const unpacedAthletes = workoutTeam.filter(ath => ath.pace === 0);
        const allAthletes = pacedAthletes.concat(unpacedAthletes);
        let sortedAthletes = [];
        allAthletes.forEach(ath => {
          sortedAthletes.push(ath.name)
        });
        this.setupTimer(sortedAthletes)
      })
  }

  setupTimer(sortedAthletes) {
    this.createDescription();
    this.createAthletesArray(sortedAthletes);
  }

  createDescription() {
    const date = new Date(Date.now()).toDateString().split(" ");
    const month = date[1];
    const day = date[2].charAt(0) === "0" ? date[2].charAt(1) : date[2];
    const workoutData = this.state.workoutData;
    const description = `${month} ${day} - ${workoutData.lapCount} x ${workoutData.lapDistance}${workoutData.lapMetric}`;
    this.setState({ description })
  }

  createAthletesArray(sortedAthletes) {
    let athletesArray = [];
    for (let i = 0; i < sortedAthletes.length; i++) {
      let athleteObj = {
        index: i,
        name: sortedAthletes[i],
        readout: {
          main: "0:00",
          decimal: "0"
        },
        currentLap: 0,
        lapTimesArray: [0],
        workoutDone: false,
        elapsed: 0,
        lastLapPace: {
          decimal: '-',
          main: '-'
        },
        lastLapDiff: {
          decimal: null,
          main: null,
        },
        paceIsFaster: null
      };
      athletesArray.push(athleteObj);
    }
    this.setState({athletesArray, totalAthletes: athletesArray.length}, () => {
      this.initButtons();
    });
  }

  initButtons() {
    // set currentAthleteOrder
    let currentAthleteOrder = [];
    for (let i = 0; i < this.state.totalAthletes; i++) {
      currentAthleteOrder.push(this.state.athletesArray[i].index)
    }
    this.setState({currentAthleteOrder}, () => {
      // create steps + initial btnTopPositions
      let steps = [];
      let btnTopPositions = [];
      for (let i = 0; i < this.state.totalAthletes; i++) {
        const value = i * buttonSpacing;
        steps.push(value);
        btnTopPositions.push(new Animated.Value(value))
      }
      this.setState({steps, btnTopPositions})
    });
  }

  cancelWorkout() {
    if (this.state.lapsCompleted > 0) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Save workout', 'No, reset the timer'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
          title: "Stop the timer?",
          message: "Would you like to save the completed laps?"
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 1:
              this.saveWorkout();
              break;
            case 2:
              this.resetTimer();
              break;
            default:
              console.log("cancel")
          }
        }
      )
    } else {
      console.log("no laps recorded - reset timer");
      this.resetTimer();
    }
  }

  resetTimer() {
    clearInterval(this.state.interval);
    this.props.navigation.goBack();
  }

  startTimer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const startTime = Date.now();
    this.setState({timerOn: true});
    this.setState({startTime}, () => {
      this.setState({interval: setInterval(this.update.bind(this), 10)});
    });
  }

  update() {
    const now = Date.now();
    const time = now - this.state.startTime;
    this.setState({time});
    const mainReadout = Utils.createDisplayTime(time);
    this.setState({mainReadout});

    for (let i = 0; i < this.state.athletesArray.length; i++) {
      if (!this.state.athletesArray[i].workoutDone) {
        const newLapTime = time - this.state.athletesArray[i].elapsed;
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === i ? Object.assign(obj, {readout: Utils.createDisplayTime(newLapTime)}) : obj)
          )
        }));
      }
    }
  }

  recordLap(athleteIndex) {
    if (this.state.timerOn) {
      if (!this.state.athletesArray[athleteIndex].workoutDone) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const thisLap = Date.now() - this.state.startTime;
        let newLapArray = this.state.athletesArray[athleteIndex].lapTimesArray;
        newLapArray.push(thisLap);
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === athleteIndex ? Object.assign(obj, {lapTimesArray: newLapArray}) : obj)
          )
        }), () => this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {elapsed: thisLap}) : obj)
           )
          }))
        );

        const newCurrentLap = this.state.athletesArray[athleteIndex].currentLap + 1;
        const lastLapTime = newLapArray[newCurrentLap] - newLapArray[newCurrentLap - 1];
        const workoutData = this.state.workoutData;
        const lastLapPace = Utils.calcPace(
          workoutData.discipline,
          {time: lastLapTime, distance: workoutData.lapDistance, metric: workoutData.lapMetric},
          this.state.paceUnits[workoutData.discipline]
        );
        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === athleteIndex ?
              Object.assign(obj, {lastLapPace: workoutData.discipline === 'bike' ?
                  Utils.createDisplaySpeed(lastLapPace)
                  :
                  Utils.createDisplayTime(lastLapPace)
                  })
              :
              obj
            )
          )
        }));
        // lapPaceDiff
        if (newCurrentLap > 1) {
          const prevLapTime = newLapArray[newCurrentLap - 1] - newLapArray[newCurrentLap - 2];
          const prevLapPace = Utils.calcPace(
            workoutData.discipline,
            {time: prevLapTime, distance: workoutData.lapDistance, metric: workoutData.lapMetric},
            this.state.paceUnits[workoutData.discipline]
          );
          const lapPaceDiff = lastLapPace - prevLapPace;
          const paceIsFaster = (lapPaceDiff < 0) ? workoutData.discipline !== 'bike' : workoutData.discipline === 'bike';
          this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {paceIsFaster}) : obj)
            )
          }));

          this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ?
                  Object.assign(obj, {lastLapDiff: workoutData.discipline === 'bike' ?
                      Utils.createDisplaySpeed(lapPaceDiff)
                      :
                      Utils.createDisplayTime(Math.abs(lapPaceDiff))
                  })
                  :
                  obj
              )
            )
          }));
        }

        this.setState(prevState => ({
          athletesArray: prevState.athletesArray.map(
            obj => (obj.index === athleteIndex ? Object.assign(obj, {currentLap: newCurrentLap}) : obj)
          )
        }), () => this.checkTotalLaps());

        if (newCurrentLap === this.state.workoutData.lapCount) {
          this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {workoutDone: true}) : obj)
            )
          }), () => this.setState(prevState => ({
            athletesArray: prevState.athletesArray.map(
              obj => (obj.index === athleteIndex ? Object.assign(obj, {readout: {main: 'done', decimal: ''}}) : obj)
            )
          }), () => {
            // remove athlete from currentAthleteOrder + adjust totalAthletes and container height
            let currentAthleteOrder = Object.assign([], this.state.currentAthleteOrder);
            const newCurrentAthleteOrder = currentAthleteOrder.filter(index => index !== athleteIndex);
            this.setState(prevState => ({
              totalAthletes: prevState.totalAthletes - 1,
              currentAthleteOrder: newCurrentAthleteOrder
            }))
          })
          )
        }
        this.animateButtons(athleteIndex);
      }
    }
  }

  animateButtons(index) {
    // move pressed button to bottom
    Animated.timing(
      this.state.btnTopPositions[index],
      {
        toValue: this.state.steps[this.state.totalAthletes - 1],
        duration: buttonAnimDuration,
      }
    ).start();
    // move up 1 step all buttons below the pressed
    const currentOrderIndex = this.state.currentAthleteOrder.indexOf(index);
    const btnsToMoveUp = this.makeNextButtonsArray(currentOrderIndex);
    this.moveUp(btnsToMoveUp);
    // update currentAthleteOrder
    let newCurrentAthleteOrder = Object.assign([], this.state.currentAthleteOrder);
    newCurrentAthleteOrder.splice(currentOrderIndex, 1);
    newCurrentAthleteOrder.push(index);
    this.setState({currentAthleteOrder: newCurrentAthleteOrder})
  }

  makeNextButtonsArray(currentOrderIndex) {
    return Object.assign([], this.state.currentAthleteOrder).slice(currentOrderIndex + 1)
  }

  moveUp(btnsArray) {
    btnsArray.forEach((index) => {
      const currentOrderIndex = this.state.currentAthleteOrder.indexOf(index);
      Animated.timing(
        this.state.btnTopPositions[index],
        {
          toValue: this.state.steps[currentOrderIndex - 1],
          duration: buttonAnimDuration,
        }
      ).start()
    })
  }

  checkTotalLaps() {
    const currentLaps = [];
    for (let i = 0; i < this.state.athletesArray.length; i++) {
      currentLaps.push(this.state.athletesArray[i].currentLap)
    }
    const lowestLap = currentLaps.sort(( a, b ) => a - b )[0];
    this.setState({lapsCompleted: lowestLap});
    if (lowestLap === this.state.workoutData.lapCount) {
      this.saveWorkout();
    }
  }

  saveWorkout() {
    clearInterval(this.state.interval);
    let workoutArray = [];
    this.state.athletesArray.forEach(athlete => {
      let newAthObj = {
        athlete: athlete.name,
        laps: this.convertLapTimes(athlete.lapTimesArray)
      };
      workoutArray.push(newAthObj);
    });
    let newSaveObj = {
      [this.state.startTime]: {
        id: this.state.startTime,
        description: this.state.description,
        discipline: this.state.workoutData.discipline,
        lap_distance: this.state.workoutData.lapDistance,
        lap_metric: this.state.workoutData.lapMetric,
        workout: workoutArray
      }
    };
    StoreUtils.mergeStore('WorkoutStore', newSaveObj)
      .then(() => {
        this.props.navigation.navigate('ResultsList')
      })
  }

  convertLapTimes(arr) {
    const trueArray = [];
    for (let i = 0; i < arr.length - 1; i++) {
      trueArray.push(arr[i + 1] - arr[i]);
    }
    return trueArray;
  }

  renderPaceDiff(athlete) {
    return (
      athlete.lastLapDiff.main
        ?
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              style={[styles.paceDiffArrow, athlete.paceIsFaster ? styles.paceDiffArrowFaster : styles.paceDiffArrowSlower]}
              source={IMAGES.UP_ARROW}
            />
            <Text style={[styles.paceDecimal, athlete.paceIsFaster ? styles.paceDiffFaster : styles.paceDiffSlower]}>{athlete.lastLapDiff.main}.</Text>
            <Text style={[styles.paceDiffDecimal, athlete.paceIsFaster ? styles.paceDiffFaster : styles.paceDiffSlower]}>{athlete.lastLapDiff.decimal}</Text>
          </View>
        :
          null
    )
  }

  renderAthleteButtons() {
    return _.map(this.state.athletesArray, athlete => {
      if (!athlete.workoutDone) {
        return (
          <Animated.View key={athlete.index} style={{position: 'absolute', left: 0, top: this.state.btnTopPositions[athlete.index]}}>
            <TouchableOpacity
              key={athlete.index}
              style={styles.athleteButton}
              onPress={() => this.recordLap(athlete.index)}
            >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.athleteName}>{athlete.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingRight: 10}}>
                  <Text style={styles.lapLabel}>lap: </Text>
                  <Text style={styles.lapNum}>{athlete.currentLap + 1}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 5}}>
                  <Text style={[styles.paceMain, styles.lastLapPaceMain]}>{athlete.lastLapPace.main}.</Text>
                  <Text style={[styles.paceDecimal, styles.lastLapPaceDecimal]}>{athlete.lastLapPace.decimal}</Text>
                  <Text style={styles.lastLapPaceLabel}>{this.state.paceLabel}</Text>
                  {this.renderPaceDiff(athlete)}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text style={styles.athleteReadoutMain}>{athlete.readout.main}.</Text>
                  <View style={{width: 30, alignItems: 'flex-start'}}>
                    <Text style={styles.athleteReadoutDecimal}>{athlete.readout.decimal}</Text>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          </Animated.View>
        )
      } else {
        return null;
      }
    })
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          {!this.state.timerOn ?
            <View style={styles.timerOffTopRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => this.cancelWorkout()}
                >
                <Image
                  style={styles.backArrow}
                  source={IMAGES.ARROW_BACK_IOS}
                />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.startBtnContainer}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => this.startTimer()}
                >
                  <Image
                    source={IMAGES.STOPWATCH_SM}
                    style={styles.startBtnIcon}
                  />
                  <Text style={styles.startBtnLabel}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          :
            <View style={styles.timerOnTopRow}>
              <View>
                <PieChart
                  chart_wh={74}
                  series={[this.state.lapsCompleted, this.state.workoutData.lapCount - this.state.lapsCompleted]}
                  sliceColor={[sharedStyles.COLOR_GREEN, sharedStyles.COLOR_PURPLE]}
                  doughnut={true}
                  coverRadius={0.9}
                  coverFill={sharedStyles.COLOR_DARK_BLUE}
                />
                <View style={styles.lapNumBlock}>
                  <Text style={styles.lapsCompleted}>{this.state.lapsCompleted}</Text>
                </View>
              </View>
              <View style={styles.readoutBlock}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <DisciplineIcon
                    disc={this.state.workoutData.discipline}
                    iconStyle={{width: 20, tintColor: sharedStyles.COLOR_GREEN, marginRight: 5}}
                  />
                  <Text style={styles.description}>{this.state.description}</Text>
                </View>
                <Text style={styles.mainReadoutMain}>{this.state.mainReadout.main}</Text>
              </View>
              <TouchableOpacity
                style={styles.stopBtn}
                onPress={() => this.cancelWorkout()}>
                <Image
                  style={styles.stopBtn}
                  source={IMAGES.OUTLINE_CANCEL_SM}/>
              </TouchableOpacity>
            </View>
          }
        </View>

        <View style={{flex: 1, backgroundColor: sharedStyles.COLOR_GREEN}}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{height: this.state.totalAthletes * buttonSpacing}}>
              {this.renderAthleteButtons()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const SIDE_PADDING = 15;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  topContainer: {
    height: 100
  },
  timerOffTopRow: {
	  flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  backButton: {
	  flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 10,
    marginRight: 30
  },
  backArrow: {
    width: 12,
    height: 12 / IMAGES.ARROW_BACK_IOS_ASPECT,
    tintColor: sharedStyles.COLOR_LIGHT_BLUE,
    marginRight: 6
  },
  cancelText: {
	  color: sharedStyles.COLOR_LIGHT_BLUE,
    fontSize: 16,
    paddingTop: 1,
  },
  startBtnContainer: {
	  flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingRight: 20
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_GREEN,
    borderRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  startBtnIcon: {
    width: 35,
    height: 35 / IMAGES.STOPWATCH_ASPECT,
    marginRight: 10,
    tintColor: sharedStyles.COLOR_PURPLE
  },
  startBtnLabel: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 40,
    color: sharedStyles.COLOR_PURPLE
  },
  timerOnTopRow: {
	  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  lapNumBlock: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
    height: 74,
    top: 0,
    left: 0
  },
  lapsCompleted: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 40,
    color: sharedStyles.COLOR_GREEN
  },
  readoutBlock: {
	  flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 20,
    color: sharedStyles.COLOR_GREEN,
  },
  mainReadoutMain: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    color: sharedStyles.COLOR_GREEN,
	  fontSize: 60,
  },
  stopBtn: {
	  width: 40,
    height: 40,
	  tintColor: sharedStyles.COLOR_RED
  },
  scrollView: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 20,
    paddingBottom: 20
  },
  athleteButton: {
	  height: athleteButtonHeight,
    width: sharedStyles.DEVICE_WIDTH - (2 * SIDE_PADDING),
	  borderRadius: 5,
    backgroundColor: sharedStyles.COLOR_WHITE,
    paddingLeft: 10,
  },
  athleteName: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
    color: sharedStyles.COLOR_DARK_BLUE,
  },
  athleteReadoutMain: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 45,
    color: sharedStyles.COLOR_PURPLE
  },
  athleteReadoutDecimal: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 3
  },
  lapLabel: {
	  fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
	  fontSize: 25,
    color: sharedStyles.COLOR_DARK_BLUE,
    paddingBottom: 4
  },
  lapNum: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 30,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 2
  },
  paceMain: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 25,
  },
  lastLapPaceMain: {
    color: sharedStyles.COLOR_DARK_BLUE
  },
  paceDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    paddingBottom: 1
  },
  lastLapPaceDecimal: {
    color: sharedStyles.COLOR_DARK_BLUE,
  },
  lastLapPaceLabel: {
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 17,
    color: sharedStyles.COLOR_LIGHT_BLUE,
    paddingBottom: 2,
  },
  paceDiffDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 16,
    paddingBottom: 2
  },
  paceDiffArrow: {
	  width: 12,
    height: 12 / IMAGES.UP_ARROW_ASPECT,
    marginLeft: 5,
    marginRight: 2,
    marginBottom: 10
  },
  paceDiffArrowSlower: {
    tintColor: sharedStyles.COLOR_RED,
    transform: [{rotate: '180deg'}],
  },
  paceDiffArrowFaster: {
    tintColor: sharedStyles.COLOR_DARK_GREEN,
  },
  paceDiffSlower: {
    color: sharedStyles.COLOR_RED,
  },
  paceDiffFaster: {
	  color: sharedStyles.COLOR_DARK_GREEN
  }
});
