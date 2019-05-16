import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import _ from 'lodash';

import StoreUtils from '../../utility/store_utils';
import IMAGES from '@assets/images';
import sharedStyles from '../../styles/shared_styles';
import DisciplineIcon from "../../components/discipline_icon";

export default class ResultsList extends Component {

  static navigationOptions = {
    title: 'Results',
    headerBackTitle: 'Results',
  };

  constructor(props) {
    super(props);
    this.state = {
      workoutStore: {},
      workouts: [],
      showEmptyMessage: true,
      filters: {
        swim: true,
        bike: true,
        run: true
      }
    }
  }

  getResults(){
    // console.log("onWillFocus - getResults");
    StoreUtils.getStore('WorkoutStore')
      .then(res => {
        if (res !== null) {
          // console.log("WorkoutStore", res);
          this.setState({workoutStore: res});
          this.sortList(res);
        }
      })
  }

  sortList(workouts) {
    const sortedList = _.sortBy(workouts, ['id']).reverse();
    // console.log("sortedList", sortedList);
    if (sortedList.length) {
      this.setState({workouts: sortedList}, () => {
        this.setState({showEmptyMessage: false});
      })
    } else {
      this.setState({showEmptyMessage: true});
    }
  }

  renderWorkouts() {
    return _.map(this.state.workouts, workout => {
      if (this.state.filters[workout.discipline]) {
        return (
          <TouchableOpacity
            style={styles.workoutBtn}
            key={workout.id}
            onPress={() => this.selectWorkout(workout)}
          >
            <DisciplineIcon
              disc={workout.discipline}
              iconStyle={{ width: 30, tintColor: sharedStyles.COLOR_GREEN }}
            />
            <Text style={styles.workoutLabel}>{workout.description}</Text>
          </TouchableOpacity>
        )
      }
    })
  }

  selectWorkout(workout) {
    this.props.navigation.navigate(`WorkoutDetail`,
      { headerTitle: workout.description,  selectedWorkout: workout, workoutStore: this.state.workoutStore });
  }

  // THIS IS TEMPORARY FOP TESTING THAT NEW RESULTS ARE AUTO LOADING
  deleteAllWorkouts() {
    if (this.state.workouts.length > 0) {
      StoreUtils.removeStore('WorkoutStore')
        .then(() => {
          // console.log("removed all workouts");
          this.setState({workouts: {}, showEmptyMessage: true});
        })
    }
  }

  render(){
    return(
      <View style={[sharedStyles.LAYOUT_MAIN_STRETCH, {paddingLeft: 10}]}>
        <NavigationEvents
          onWillFocus={() => this.getResults()}
        />

        { this.state.showEmptyMessage ?
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyStopwatch}
                source={IMAGES.STOPWATCH_MED}
                />
              <Text style={styles.emptyResults}>You do not have any saved results!</Text>
            </View>
          :
            <View style={{flex: 1}}>
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={[ styles.filterBtn,
                    this.state.filters.swim ? styles.selectedFilterBtn : styles.unselectedFilterBtn
                  ]}
                  onPress={() => this.setState(
                    { filters: { ...this.state.filters, swim: !this.state.filters.swim } })}
                >
                  <Image
                    style={[ styles.filterIcon,
                      styles.swimIcon, this.state.filters.swim ? styles.selectedFilterIcon : styles.unselectedFilterIcon
                    ]}
                    source={IMAGES.SWIM_ICON_SM}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[ styles.filterBtn,
                    this.state.filters.bike ? styles.selectedFilterBtn : styles.unselectedFilterBtn
                  ]}
                  onPress={() => this.setState(
                    { filters: { ...this.state.filters, bike: !this.state.filters.bike } })}
                >
                  <Image
                    style={[ styles.filterIcon,
                      styles.bikeIcon, this.state.filters.bike ? styles.selectedFilterIcon : styles.unselectedFilterIcon
                    ]}
                    source={IMAGES.BIKE_ICON_SM}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[ styles.filterBtn,
                    this.state.filters.run ? styles.selectedFilterBtn : styles.unselectedFilterBtn
                  ]}
                  onPress={() => this.setState(
                    { filters: { ...this.state.filters, run: !this.state.filters.run } })}
                >
                  <Image
                    style={[ styles.filterIcon,
                      styles.runIcon, this.state.filters.run ? styles.selectedFilterIcon : styles.unselectedFilterIcon
                    ]}
                    source={IMAGES.RUN_ICON_SM}
                  />
                </TouchableOpacity>
              </View>
            <ScrollView>
              {this.renderWorkouts()}
            </ScrollView>
            </View>
        }
        {/*<Button
          title="DELETE ALL"
          onPress={() => this.deleteAllWorkouts()}/>*/}
      </View>
    )
  }
}

const iconWidth = 30;

const styles = StyleSheet.create({
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
  emptyStopwatch: {
	  width: 80,
    height: 80 / IMAGES.STOPWATCH_ASPECT,
    tintColor: sharedStyles.COLOR_RED,
    marginBottom: 10
  },
  emptyResults: {
	  fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
    fontSize: 25,
    color: sharedStyles.COLOR_RED
  },
  filterContainer: {
	  flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  filterBtn: {
	  justifyContent: 'center',
    alignItems: 'center',
	  width: 46,
    height: 46,
    borderRadius: 23,
    marginHorizontal: 10
  },
  selectedFilterBtn: {
    backgroundColor: sharedStyles.COLOR_GREEN,
  },
  unselectedFilterBtn: {
	  backgroundColor: sharedStyles.COLOR_WHITE,
    borderColor: sharedStyles.COLOR_LIGHT_GRAY,
    borderWidth: 1
  },
  filterIcon: {
	  width: iconWidth,
  },
  selectedFilterIcon: {
    tintColor: sharedStyles.COLOR_PURPLE
  },
  unselectedFilterIcon: {
    tintColor: sharedStyles.COLOR_LIGHT_GRAY
  },
  workoutBtn: {
	  flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutLabel: {
	  color: sharedStyles.COLOR_PURPLE,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 35,
    paddingLeft: 5
  },
  swimIcon: {
	  height: iconWidth / IMAGES.SWIM_ICON_ASPECT
  },
  bikeIcon: {
	  height: iconWidth / IMAGES.BIKE_ICON_ASPECT
  },
  runIcon: {
	  height: iconWidth / IMAGES.RUN_ICON_ASPECT
  }
});
