import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import _ from 'lodash';
import Utils from '../../utility/utils'

import Separator from '../../components/separator';
import SecondaryButton from '../../components/secondary_button';
import ResultDetailHeader from '../../components/result_detail_header';

import sharedStyles from '../../styles/shared_styles';
import StoreUtils from '../../utility/store_utils';

const resultsWidth = sharedStyles.DEVICE_WIDTH * 0.8;

export default class WorkoutDetail extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <ResultDetailHeader workout={navigation.getParam('selectedWorkout')} />
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedWorkout: {},
      workoutStore: {},
      paceSettings: {}
    }
  }

  componentDidMount() {
    const { selectedWorkout, workoutStore } = this.props.navigation.state.params;
    // console.log("selected workout: ", selectedWorkout);
    this.setState({ selectedWorkout, workoutStore });
  }

  getPaceSettings() {
    StoreUtils.getStore('UserSettingsStore')
      .then(res => this.setState({paceSettings: res.pace_units}))
  }

  deleteConfirm() {
    Alert.alert(
      'Warning!',
      'There\'s no going back to this workout...',
      [
        {text: 'Cancel', onPress: () => console.log('cancel deletion'), style: 'cancel'},
        {text: 'Delete', onPress: () => this.deleteResult()}
      ]
    )
  }

  deleteResult() {
    let updatedWorkoutStore = this.state.workoutStore;
    delete updatedWorkoutStore[this.state.selectedWorkout.id];

    StoreUtils.setStore('WorkoutStore', updatedWorkoutStore)
      .then(() => {
        this.props.navigation.navigate('ResultsList');
      })
  }

  renderPaceLabel() {
    return Utils.getPaceLabel(this.state.selectedWorkout.discipline, this.state.paceSettings);
  }

  renderLaps(lapsArray) {
    return _.map(lapsArray, (lapTime, index) => {
      const displayTime = Utils.createDisplayTime(lapTime);
      const lapPace = Utils.calcPace(
        this.state.selectedWorkout.discipline,
        {
          time: lapTime,
          distance: this.state.selectedWorkout.lap_distance,
          metric: this.state.selectedWorkout.lap_metric
        },
        this.state.paceSettings[this.state.selectedWorkout.discipline]
      );
      const displayPace = (this.state.selectedWorkout.discipline === 'bike') ?
        Utils.createDisplaySpeed(lapPace)
        :
        Utils.createDisplayTime(lapPace);

      return (
        <View key={lapTime} style={styles.lapRow}>
          <View style={styles.timeBox}>
            <Text style={styles.lapNum}>{index + 1}:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.lapTime}>{displayTime.main}.</Text>
              <Text style={styles.lapTimeDecimal}>{displayTime.decimal}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={styles.lapTime}>{displayPace.main}.</Text>
            <Text style={styles.lapTimeDecimal}>{displayPace.decimal}</Text>
            <Text style={styles.paceLabel}>{this.renderPaceLabel()}</Text>
          </View>
        </View>
      )
    })
  }

  renderSummary(lapsArray) {
    const totalTimeMS = lapsArray.reduce((a, b) => a + b),
      totalTime = Utils.createDisplayTime(totalTimeMS),
      lapAvg = Utils.createDisplayTime(Math.floor(totalTimeMS / lapsArray.length));
    const dist = lapsArray.length * this.state.selectedWorkout.lap_distance;
    const totalDist = Utils.createDisplaySpeed(dist);

    const pace = Utils.calcPace(
      this.state.selectedWorkout.discipline,
      {
        time: totalTimeMS,
        distance: (this.state.selectedWorkout.lap_distance * lapsArray.length),
        metric: this.state.selectedWorkout.lap_metric
      },
      this.state.paceSettings[this.state.selectedWorkout.discipline]
    );
    const totalPace = this.state.selectedWorkout.discipline === 'bike' ?
      Utils.createDisplaySpeed(pace)
      :
      Utils.createDisplayTime(pace);

    return (
      <View>
        <View style={styles.lapRow}>
          <View style={styles.timeBox}>
            <Text style={styles.lapNum}>total:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.totalTime}>{totalTime.main}.</Text>
              <Text style={styles.totalTimeDecimal}>{totalTime.decimal}</Text>
            </View>
          </View>
          <View style={styles.timeBox}>
            <View style={styles.timeBox}>
              <Text style={styles.totalTime}>{totalDist.main}.</Text>
              <Text style={styles.totalTimeDecimal}>{totalDist.decimal}</Text>
              <Text style={styles.paceLabel}>{this.state.selectedWorkout.lap_metric}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lapRow}>
          <View style={styles.timeBox}>
            <Text style={styles.lapNum}>avg:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.lapTime}>{lapAvg.main}.</Text>
              <Text style={styles.lapTimeDecimal}>{lapAvg.decimal}</Text>
              <Text style={styles.paceLabel}>/lap</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={styles.lapTime}>{totalPace.main}.</Text>
            <Text style={styles.lapTimeDecimal}>{totalPace.decimal}</Text>
            <Text style={styles.paceLabel}>{this.renderPaceLabel()}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderAthletes() {
    if (!this.state.selectedWorkout.workout) return;

    return _.map(this.state.selectedWorkout.workout, athlete => {
      // console.log("athlete", athlete.athlete)
      return (
        <View key={athlete.athlete}>
          <View style={styles.nameBlock}>
            <Text style={styles.athleteName}>{athlete.athlete}</Text>
          </View>
          <View style={styles.resultsBlock}>
            <View style={styles.lapsBlock}>
              { this.renderLaps(athlete.laps) }
            </View>
            <Separator
              width={resultsWidth}
              color={sharedStyles.COLOR_GREEN}/>
            <View style={styles.lapsBlock}>
              { this.renderSummary(athlete.laps) }
            </View>
          </View>
        </View>
      )
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getPaceSettings()}
        />
        <ScrollView>
          { this.renderAthletes() }
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => this.deleteConfirm()}>
            <SecondaryButton
              label={'delete result'}
              color={sharedStyles.COLOR_RED}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignSelf: 'stretch'
	},
  nameBlock: {
	  backgroundColor: sharedStyles.COLOR_GREEN,
    paddingBottom: 5,
  },
  resultsBlock: {
	  justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  athleteName: {
    textAlign: 'center',
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 40,
    color: sharedStyles.COLOR_PURPLE
  },
  lapsBlock: {
	  width: resultsWidth,
    paddingBottom: 5,
  },
  lapRow: {
	  flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lapNum: {
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 25,
    color: sharedStyles.COLOR_DARK_BLUE,
    paddingRight: 5,
    paddingBottom: 2
  },
  timeBox: {
	  flexDirection: 'row',
    alignItems: 'flex-end'
	},
  lapTime: {
	  fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
	  fontSize: 30,
    color: sharedStyles.COLOR_PURPLE
  },
  lapTimeDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 23,
    color: sharedStyles.COLOR_PURPLE,
    paddingBottom: 2,
  },
  paceLabel: {
	  fontSize: 18,
    fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    color: sharedStyles.COLOR_LIGHT_BLUE,
    paddingBottom: 3
  },
  totalTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_DARK_BLUE
  },
  totalTimeDecimal: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 23,
    color: sharedStyles.COLOR_DARK_BLUE,
    paddingBottom: 2,
  },
  avgTime: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_GREEN
  },
  deleteBtn: {
	  justifyContent: 'center',
    alignItems: 'center',
	  paddingVertical: 20
  }
});
