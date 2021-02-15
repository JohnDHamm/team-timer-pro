import {MEASUREMENTS, PACE_UNITS, DISTANCE_CONVERSIONS, ERR_MSG, DISCIPLINES} from '../constants'

describe('constants', () => {
  describe('MEASUREMENTS', () => {
    test('METER is "m"', () => {
      expect(MEASUREMENTS.METER).toBe('m')
    });

    test('YARD is "yd"', () => {
      expect(MEASUREMENTS.YARD).toBe('yd')
    });

    test('MILE is "mi"', () => {
      expect(MEASUREMENTS.MILE).toBe('mi')
    });

    test('KILOMETER is "km"', () => {
      expect(MEASUREMENTS.KILOMETER).toBe('km')
    });
  });

  describe('PACE_UNITS', () => {
    test('swim pace units are [ "yd", "m" ]', () => {
      expect(PACE_UNITS.swim).toStrictEqual(["yd", "m"])
    });

    test('bike pace units are [ "mi", "km" ]', () => {
      expect(PACE_UNITS.bike).toStrictEqual(["mi", "km"])
    });

    test('run pace units are [ "mi", "km" ]', () => {
      expect(PACE_UNITS.run).toStrictEqual(["mi", "km"])
    });
  });

  describe('DISCIPLINES', () => {
    test('the disciplines are swim, bike, run', () => {
      expect(DISCIPLINES).toStrictEqual(["swim", "bike", "run"])
    })
  });

  describe('DISTANCE_CONVERSIONS', () => {
    test('there are currently 12 conversions', () => {
      expect(Object.keys(DISTANCE_CONVERSIONS).length).toBe(12)
    });

    test('m-yd', () => {
      expect(DISTANCE_CONVERSIONS['m-yd']).toBe(1.093613298)
    });

    test('km-yd', () => {
      expect(DISTANCE_CONVERSIONS['km-yd']).toBe(1093.613298)
    });

    test('mi-yd', () => {
      expect(DISTANCE_CONVERSIONS['mi-yd']).toBe(1759.999999456512)
    });

    test('yd-m', () => {
      expect(DISTANCE_CONVERSIONS['yd-m']).toBe(0.9144)
    });

    test('km-m', () => {
      expect(DISTANCE_CONVERSIONS['km-m']).toBe(1000)
    });

    test('mi-m', () => {
      expect(DISTANCE_CONVERSIONS['mi-m']).toBe(1609.344)
    });

    test('m-mi', () => {
      expect(DISTANCE_CONVERSIONS['m-mi']).toBe(0.000621371192)
    });

    test('yd-mi', () => {
      expect(DISTANCE_CONVERSIONS['yd-mi']).toBe(0.000568181817965)
    });

    test('km-mi', () => {
      expect(DISTANCE_CONVERSIONS['km-mi']).toBe(0.621371192)
    });

    test('m-km', () => {
      expect(DISTANCE_CONVERSIONS['m-km']).toBe(0.001)
    });

    test('yd-km', () => {
      expect(DISTANCE_CONVERSIONS['yd-km']).toBe(0.0009144)
    });

    test('mi-km', () => {
      expect(DISTANCE_CONVERSIONS['mi-km']).toBe(1.609344)
    });
  });

  describe('ERR_MSG', () => {
    test('there are currently 2 error messages', () => {
      expect(Object.keys(ERR_MSG).length).toBe(2)
    });

    test('DUPE_NAME', () => {
      expect(ERR_MSG.DUPE_NAME).toBe('That name already exists!')
    });

    test('EMPTY_NAME', () => {
      expect(ERR_MSG.EMPTY_NAME).toBe('Name cannot be empty!')
    });
  })
});
