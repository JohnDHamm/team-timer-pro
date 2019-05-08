## AsyncStorage Stores

### TeamStore (basic)
```
{
    "Bob": {
        "name": "Bob"
    },
    "Suzy": {
        "name": "Suzy"
    },
    ...
}
```

### WorkoutStore (basic)
```
{
    "1557259375667": {
        "description": "May 7 - 3 x 250m",
        "id": 1557259375667,
        "workout": [
            {
                "athlete": "Bob",
                "laps": [
                    6406,
                    7691,
                    6088
                ]
            },
            {
                "athlete": "Suzy",
                "laps": [
                    6831,
                    5745,
                    5654
                ]
            }
        ]
    },
    ...
}
```

### WorkoutStore (pro)
```
{
    "1557259375667": {
        "description": "May 7 - 3 x 250m",
        "discipline": "swim",
        "id": 1557259375667,
        "lap_distance": 250,
        "lap_metric": "m",
        "workout": [
            {
                "athlete": "Bob",
                "laps": [
                    6406,
                    7691,
                    6088
                ]
            },
            {
                "athlete": "Suzy",
                "laps": [
                    6831,
                    5745,
                    5654
                ]
            }
        ]
    },
    ...
}
```

### PaceUnitsStore

```
{
    "swim": "yd", // or "m"
    "bike": "mi", // or "km"
    "run": "mi"   // or "km"
}
```