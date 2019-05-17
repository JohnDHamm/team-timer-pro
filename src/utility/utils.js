import _ from 'lodash'
import TimeConversion from './time_conversion'
import { DISTANCE_CONVERSIONS } from './constants';

const Utils = {
  createTeamList: (teamStore) => {
    return _.sortBy(_.map(teamStore), 'name');
  },
  createDisplayTime: (timeMS) => {
    let timeObj = {};
    const time =TimeConversion(timeMS).split('.');
    timeObj.main = time[0];
    timeObj.decimal = time[1];
    return timeObj;
  },
  createDisplaySpeed: (speed) => {
    const speedArray = speed.toFixed(1).split('.');
    let speedObj = {};
    speedObj.main = speedArray[0];
    speedObj.decimal = speedArray[1];
    return speedObj;
  },
  convertMMSStoMS: (minutes, seconds) => {
    const mins = parseInt(minutes) * 60 * 1000;
    const secs = parseInt(seconds) * 1000;
    return mins + secs;
  },
  calcPace: (disc, data, paceUnit) => {
    let factor = 1.0;
    if (data.metric !== paceUnit) {
      factor = DISTANCE_CONVERSIONS[`${data.metric}-${paceUnit}`];
    }
    switch (disc) {
      case 'swim':
        return data.time * ( 100 / ( data.distance * factor ));
      case 'bike':
        return ( data.distance * factor ) / ( data.time / (1000 * 60 * 60) );
      case 'run':
        return data.time / ( data.distance * factor );
      default:
        return 0;
    }
  }
};

export default Utils;
