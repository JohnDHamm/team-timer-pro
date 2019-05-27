export const MEASUREMENTS = {
  METER: 'm',
  YARD: 'yd',
  MILE: 'mi',
  KILOMETER: 'km'
};

export const PACE_UNITS = {
  swim: [ MEASUREMENTS.YARD, MEASUREMENTS.METER],
  bike: [ MEASUREMENTS.MILE, MEASUREMENTS.KILOMETER],
  run: [ MEASUREMENTS.MILE, MEASUREMENTS.KILOMETER]
};

export const DISCIPLINES = [
  'swim',
  'bike',
  'run'
];

export const DISTANCE_CONVERSIONS = {
  'm-yd': 1.093613298,
  'km-yd': 1093.613298,
  'mi-yd': 1759.999999456512,
  'yd-m': 0.9144,
  'km-m': 1000,
  'mi-m': 1609.344,
  'm-mi': 0.000621371192,
  'yd-mi': 0.000568181817965,
  'km-mi': 0.621371192,
  'm-km': 0.001,
  'yd-km': 0.0009144,
  'mi-km': 1.609344
};

export const ERR_MSG = {
  DUPE_NAME: 'That name already exists!',
  EMPTY_NAME: 'Name cannot be empty!'
};
