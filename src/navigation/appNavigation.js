import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Routes from './routes';
import Splash from '../screens/main/splash';
import Timer from '../screens/main/timer';
import SetupHome from '../screens/setup/setup_home';

import IMAGES from '@assets/images'
import sharedStyles from '../styles/shared_styles';

const appHeaderOptions = {
  headerStyle: {
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
  },
  headerTitleStyle: {
    color: sharedStyles.COLOR_GREEN,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 20,
  },
  headerBackTitleStyle: {
    color: sharedStyles.COLOR_LIGHT_BLUE,
    fontSize: 16,
  },
  headerTintColor: sharedStyles.COLOR_LIGHT_BLUE,
};

const SetupStack = createStackNavigator( Routes.SetupRoutes,
  { initialRouteName: 'SetupUserName',
    defaultNavigationOptions: appHeaderOptions,
  });

const WorkoutStack = createStackNavigator( Routes.WorkoutRoutes,
  { initialRouteName: 'SelectDiscipline',
    defaultNavigationOptions: appHeaderOptions,
  });

const ResultsStack = createStackNavigator( Routes.ResultsRoutes,
  { initialRouteName: 'ResultsList',
    defaultNavigationOptions: appHeaderOptions,
  });

const TeamStack = createStackNavigator( Routes.TeamRoutes,
  { initialRouteName: 'TeamList',
    defaultNavigationOptions: appHeaderOptions,
  });

const SettingsStack = createStackNavigator( Routes.SettingsRoutes,
  { initialRouteName: 'Menu',
    defaultNavigationOptions: appHeaderOptions,
  });

const TabNavConfig = {
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: true,
    inactiveTintColor: sharedStyles.COLOR_LIGHT_BLUE,
    activeTintColor: sharedStyles.COLOR_GREEN,
    style: {
      backgroundColor: sharedStyles.COLOR_DARK_BLUE,
    },
  }
};

const TabNav = createBottomTabNavigator({
  Workout: { screen: WorkoutStack,
    navigationOptions: {
      tabBarLabel: 'Workout',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={IMAGES.WORKOUT_TAB_ICON}
          style={[styles.workoutTabIcon, {tintColor: tintColor}]}
        />
      )
    }
  },
  Results: { screen: ResultsStack,
    navigationOptions: {
      tabBarLabel: 'Results',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={IMAGES.RESULTS_TAB_ICON}
          style={[styles.resultsTabIcon, {tintColor: tintColor}]}
        />
      )
    }
  },
  Team: { screen: TeamStack,
    navigationOptions: {
      tabBarLabel: 'Team',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={IMAGES.TEAM_TAB_ICON}
          style={[styles.teamTabIcon, {tintColor: tintColor}]}
        />
      )
    }
  },
  Settings: { screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={IMAGES.SETTINGS_TAB_ICON}
          style={[styles.settingsTabIcon, {tintColor: tintColor}]}
        />
      )
    }
  },
}, TabNavConfig );

const MainStackConfig = {
  headerMode: 'none',
  mode: 'modal'
};

const MainStack = createStackNavigator({
	Splash: { screen: Splash },
  SetupHome: { screen: SetupHome},
  Setup: { screen: SetupStack },
	MainApp: { screen: TabNav },
  Timer: { screen: Timer }
 }, MainStackConfig
);

const AppContainer = createAppContainer(MainStack);
export default AppContainer;

const styles = StyleSheet.create({
  workoutTabIcon: {
    width: 21,
    height: 26,
  },
  resultsTabIcon: {
    width: 31,
    height: 24,
  },
  teamTabIcon: {
    width: 35,
    height: 24,
  },
  settingsTabIcon: {
    width: 24,
    height: 24,
  }
});
