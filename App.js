import React from 'react';
import { StatusBar } from 'react-native';

import AppContainer from  './src/navigation/appNavigation';

export default class App extends React.Component {

  render() {

    StatusBar.setBarStyle('light-content');

    return (
      <AppContainer />
    );
  }
}

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start!</Text>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });