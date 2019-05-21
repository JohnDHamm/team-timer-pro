## Timer State

### workoutData

```
{
    discipline: "swim",
    lapCount: 5,
    lapDistance: 100,
    lapMetric: "yd,
}
```

### athletesArray

```
[
    {
        currentLap: 0,
        elapsed: 0, // elapsed marks beginning of each lap
        index: 0,
        lapTimesArray: [
            0,
        ],
        lastLapPace: {
            decimal: "2",
            main: "1:05"
        },
        name: "Hank",
        readout: {
            decimal: "0",
            main: "0:00"
        },
        workoutDone: false,
    },
    {
        currentLap: 0,
        elapsed: 0,
        index: 1,
        lapTimesArray: [
            0,
        ],
        lastLapPace: {
            decimal: "7",
            main: "0:58"
        },
        name: "Bart",
        readout: {
            decimal: "0",
            main: "0:00"
        },
        workoutDone: false,
    },
    {
        currentLap: 0,
        elapsed: 0,
        index: 2,
        lapTimesArray: [
            0,
        ],
        lastLapPace: {
            decimal: "1",
            main: "1:12"
        },
        name: "Lisa",
        ...
    },
    ...
]
```

### currentAthleteOrder

```
[ 0, 1, 2, ... ] // indexes of athletesArray
```

