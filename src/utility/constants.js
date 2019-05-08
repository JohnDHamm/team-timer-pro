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
