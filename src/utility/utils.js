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
  },
  getPaceLabel: (disc, paceUnits) => {
    switch (disc) {
      case 'swim':
        return `/100${paceUnits.swim}`;
      case 'bike':
        return paceUnits.bike === 'mi' ? 'mph' : 'km/h';
      case 'run':
        return `/${paceUnits.run}`;
      default:
        return ''
    }
  },
  convertTimeForExport: (ms) => {
    const hours = Math.floor( ms / 1000 / 60 / 60 );
    const minutes = Math.floor(ms / 1000 / 60) - ( hours * 60 );
    const seconds = (( ms / 1000) - (hours * 60 * 60) - (minutes * 60)).toFixed(1);
    let HH = (hours < 10) ? `0${hours}` : hours.toString();
    let MM = (minutes < 10) ? `0${minutes}` : minutes.toString();
    let SS = (seconds < 10) ? `0${seconds}` : seconds.toString();
    return `${HH}:${MM}:${SS}`
  }
};

export default Utils;
