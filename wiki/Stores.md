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

### TeamStore (pro)
```
{
    "Bob": {
        "name": "Bob",
        "swim_pace": 63000,
        "bike_pace": 17.4,
        "run_pace": 512000
    },
    "Suzy": {
        "name": "Suzy",
        "swim_pace": 74000,
        "bike_pace": 15.2,
        "run_pace": 585000
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

### UserSettingsStore

```
{
    "pace_units": {
        "swim": "yd", // or "m"
        "bike": "mi", // or "km"
        "run": "mi"   // or "km"
    },
    "user_name": "John"
}
```