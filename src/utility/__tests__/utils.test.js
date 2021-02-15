import Utils from '../utils'

describe('utils', () => {
  describe('createTeamList', () => {
    const teamStore = {
      Hank: {
        name: "Hank",
        swim_pace: 71000,
        bike_pace: 20.5,
        run_pace: 480000
      },
      Bob: {
        name: "Bob",
        swim_pace: 63000,
        bike_pace: 17.4,
        run_pace: 512000
      },
      Susie: {
        name: "Susie",
        swim_pace: 64500,
        bike_pace: 15.1,
        run_pace: 517800
      }
    };

    const expectedTeamList = [
      {
        name: "Bob",
        swim_pace: 63000,
        bike_pace: 17.4,
        run_pace: 512000
      },
      {
        name: "Hank",
        swim_pace: 71000,
        bike_pace: 20.5,
        run_pace: 480000
      },
      {
        name: "Susie",
        swim_pace: 64500,
        bike_pace: 15.1,
        run_pace: 517800
      }
    ];

    test('given the teamStore, returns a list sorted by name', () => {
      expect(Utils.createTeamList(teamStore)).toStrictEqual(expectedTeamList)
    })
  });

  describe('createDisplayTime given a time in ms, returns an object separating H:MM:SS and decimal s', () => {
    test('given 0 hour 1 minutes and 5.67 seconds returns M:SS and s', () => {
      expect(Utils.createDisplayTime(65667)).toStrictEqual({
        decimal: "7",
        main: "1:05"
      })
    })
  });

  describe('createDisplaySpeed given a floating-point number, returns an object separating integer and decimal', () => {
    test('given 25.43 returns 25 and 4', () => {
      expect(Utils.createDisplaySpeed(25.43)).toStrictEqual({
        decimal: "4",
        main: "25"
      })
    });

    test('given 5.06 returns 5 and 1', () => {
      expect(Utils.createDisplaySpeed(5.06)).toStrictEqual({
        decimal: "1",
        main: "5"
      })
    })
  });

  describe('convertMMSStoMS', () => {
    test('given params of "5" minutes and "32" seconds, returns 332000', () => {
      expect(Utils.convertMMSStoMS("5", "32")).toBe(332000)
    })
  });

  describe('calcPace', () => {
    describe('for swim discipline', () => {
      const data = {
        metric: "yd",
        distance: 25,
        time: 10000
      };

      test('a 10sec 25 yd swim should return 40sec pace if paceUnit is yd', () => {
        expect(Utils.calcPace("swim", data, "yd")).toBe(40000)
      });

      test('a 10sec 25 yd swim should return 40sec pace if paceUnit is m', () => {
        expect(Utils.calcPace("swim", data, "m")).toBe(43744.531933508311461)
      });
    });

    describe('for bike discipline', () => {
      const data = {
        metric: "mi",
        distance: 1,
        time: 240000
      };

      test('a 4 minute 1mi bike should return 15mph pace if paceUnit is mi', () => {
        expect(Utils.calcPace("bike", data, "mi")).toBe(15)
      });

      test('a 4 minute 1mi bike should return  pace if paceUnit is km', () => {
        expect(Utils.calcPace("bike", data, "km")).toBe(24.14016)
      });
    });

    describe('for run discipline', () => {
      const data = {
        metric: "km",
        distance: 0.5,
        time: 315000
      };

      test('a 5:15 0.5mi run should return 10:30 pace if paceUnit is km', () => {
        expect(Utils.calcPace("run", data, "km")).toBe(630000)
      });

      test('a 5:15 0.5mi run should return  pace if paceUnit is mi', () => {
        expect(Utils.calcPace("run", data, "mi")).toBe(1013886.720387256060625)
      });
    });

    test('for an invalid discipline, should return 0 pace', () => {
      expect(Utils.calcPace("walk", {}, "mi")).toBe(0)
    });

  });

  describe('getPaceLabel', () => {
    const paceUnits = {
      swim: 'yd',
      bike: 'km',
      run: 'mi'
    };

    test('given disc of swim, returns "/100yd"', () => {
      expect(Utils.getPaceLabel("swim", paceUnits)).toBe("/100yd")
    });

    test('given disc of bike, returns "km/h"', () => {
      expect(Utils.getPaceLabel("bike", paceUnits)).toBe("km/h")
    });

    test('given disc of bike and paceUnit of mi, returns "mph"', () => {
      paceUnits.bike = 'mi';
      expect(Utils.getPaceLabel("bike", paceUnits)).toBe("mph")
    });

    test('given disc of run, returns "/mi"', () => {
      expect(Utils.getPaceLabel("run", paceUnits)).toBe("/mi")
    });

    test('given invalid disc, returns ""', () => {
      expect(Utils.getPaceLabel("walk", paceUnits)).toBe("")
    })
  });

  describe('convertTimeForExport given time in ms, returns formatted time as HH:MM:SS.s', () => {
    test('given time as 1 hour, 42 minutes, 5.35 seconds, returns "01:42:05.4"', () => {
      expect(Utils.convertTimeForExport(6125350)).toBe("01:42:05.4")
    });

    test('given time as 10 hour, 2 minutes, 15 seconds, returns "10:02:15.0"', () => {
      expect(Utils.convertTimeForExport(36135000)).toBe("10:02:15.0")
    })
  });
});
